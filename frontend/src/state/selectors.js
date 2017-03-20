const IS_TEST = process.env.NODE_ENV === 'test';

import find from 'lodash.find';
import forceArray from 'force-array';
import get from 'lodash.get';
import { createSelector } from 'reselect';
import statistics from 'simple-statistics';
import moment from 'moment';

const account = (state) => get(state, 'account.data', {});
const accountUi = (state) => get(state, 'account.ui', {});
const datacenters = (state) => get(state, 'datacenters.data', {});
const orgUiSections = (state) => get(state, 'orgs.ui.sections', []);
const projectUiSections = (state) => get(state, 'projects.ui.sections', []);
const serviceUiTooltip = (state) => get(state, 'services.ui.tooltip', []);
const serviceUiSections = (state) => get(state, 'services.ui.sections', []);
const orgs = (state) => get(state, 'orgs.data', []);
const orgUI = (state) => get(state, 'orgs.ui', []);
const projects = (state) => get(state, 'projects.data', []);
const projectsUI = (state) => get(state, 'projects.ui', []);
const services = (state) => get(state, 'services.data', []);
const collapsedServices = (state) => get(state, 'services.ui.collapsed', []);
const collapsedInstances = (state) => get(state, 'instances.ui.collapsed', []);
const instances = (state) => get(state, 'instances.data', []);
const members = (state) => get(state, 'members.data', []);
const metricsUI = (state) => get(state, 'metrics.ui', {});
const metricTypes = (state) => get(state, 'metrics.data.types', []);
// const metricDatasets = (state) => get(state, 'metrics.data.datasets', []);
const metricsData = (state) => get(state, 'metrics.data', {});

const projectById = (projectId) => createSelector(
  projects,
  (projects) => find(projects, ['id', projectId])
);

const orgById = (orgId) => createSelector(
  orgs,
  (orgs) => find(orgs, ['id', orgId])
);

const orgIndexById = (orgId) => createSelector(
  orgs,
  (orgs) => orgs.map((o) => o.id).indexOf(orgId)
);

const projectIndexById = (projectId) => createSelector(
  projects,
  (projects) => projects.map((p) => p.id).indexOf(projectId)
);

const serviceById = (serviceId) => createSelector(
  [services],
  (services) => find(services, ['id', serviceId])
);

const projectsByOrgId = (orgId) => createSelector(
  [projects, orgById(orgId)],
  (projects, org) => projects.filter((p) => p.org === org.uuid)
);

const orgSections = (orgId) => createSelector(
  [orgById(orgId), orgUiSections],
  (org, sections) => sections.filter(
    (section) => forceArray(org.hide).indexOf(section) < 0
  )
);

const isCollapsed = (collapsed, uuid) => collapsed.indexOf(uuid) >= 0;

const metricByInterval = (data = [], {
  min = 0,
  max = 100
}, {
  duration = '1 hour',
  interval = '5 minutes'
}) => {
  const getDurationArgs = (value) => {
    const [durationNumber, durationType] = value.split(/\s/);
    return [Number(durationNumber), durationType];
  };

  const _duration = moment.duration(...getDurationArgs(duration));
  const _interval = moment.duration(...getDurationArgs(interval));

  const roundUpDate = (date) => {
    const mod = date.valueOf() % _interval.valueOf();
    const diff = moment.duration(_interval.valueOf() - mod);
    return moment(date).add(diff);
  };

  const roundDownDate = (date) => {
    const mod = date.valueOf() % _interval.valueOf();
    return moment(date).subtract(mod);
  };

  const lastDate = roundUpDate(moment(data[data.length - 1][0], 'X'));
  const firstDate = moment(data[0][0], 'X');

  const getStart = () => {
    const hardStart = moment(lastDate).subtract(_duration);

    return hardStart.isBefore(firstDate)
      ? roundDownDate(firstDate)
      : roundUpDate(hardStart);
  };

  const _start = getStart();

  const genSample = (start) => ({
    start: start,
    end: moment(start).add(_interval),
    values: []
  });

  const genStats = (sample) => {
    const data = sample.values.map((r) => r.v);

    return {
      start: sample.start.valueOf(),
      end: sample.end.valueOf(),
      firstQuartile: statistics.quantile(data, 0.25),
      median: statistics.median(data),
      thirdQuartile: statistics.quantile(data, 0.75),
      max: statistics.max(data),
      min: statistics.min(data),
      stddev: statistics.sampleStandardDeviation(data)
    };
  };

  const intervals = data.reduce((samples, value, i) => {
    const sample = samples[samples.length - 1];
    const previousSample = samples[samples.length - 2];

    const record = {
      v: Number(value[1]),
      t: moment(value[0], 'X')
    };

    if (record.t.isBefore(_start)) {
      return samples;
    }

    const split = () => {
      const stats = genStats(sample);

      const nextSample = {
        ...genSample(sample.end),
        values: [record]
      };

      samples[samples.length - 1] = {
        ...sample,
        stats
      };

      return [
        ...samples,
        nextSample
      ];
    };

    const append = (sample) => {
      samples[samples.length - 1] = {
        ...sample,
        values: [...sample.values, record]
      };

      return samples;
    };

    const isWithin = (
      record.t.isSameOrAfter(sample.start) &&
      record.t.isSameOrBefore(sample.end)
    );

    const isBefore = record.t.isBefore(sample.start);
    const isAfter = record.t.isAfter(sample.end);
    let newSamples = samples;

    if (isWithin) {
      newSamples = append(sample);
    }

    if (isBefore) {
      newSamples = append(previousSample);
    }

    if (isAfter) {
      newSamples = split();
    }

    if ((i + 1) >= data.length) {
      const thisSample = newSamples[newSamples.length - 1];
      const lastStats = genStats(thisSample);

      newSamples[newSamples.length - 1] = {
        ...thisSample,
        stats: lastStats
      };
    }

    return newSamples;
  }, [
    genSample(_start)
  ]);

  return {
    start: _start.valueOf(),
    end: lastDate.valueOf(),
    duration: _duration.valueOf(),
    interval: _interval.valueOf(),
    min: min,
    max: max,
    values: intervals.map((sample) => sample.stats),
    __intervals: IS_TEST ? intervals : []
  };
};

// TMP - get min and max for total data - START
const getMinMax = (data) => {
  const values = data.map((d) => Number(d[1]));
  const min = statistics.min(values);
  const max = statistics.max(values);

  return {
    min,
    max
  };
};
// TMP - get min and max for total dataset - END

// TMP - dataset playback - START
import { getDurationMilliseconds } from '../utils/duration-interval';

const getDataSubset = (data, merticsUI, metricOptions) => {
  const duration = getDurationMilliseconds(metricOptions.duration)/1000;
  const interval = getDurationMilliseconds(metricOptions.interval)/1000;
  const start = data[0][0] + interval*merticsUI.pos;
  const end = start + duration;
  return data.reduce((acc, d) => {
    if(d[0] >= start && d[0] <= end) {
      acc.push(d);
    }
    return acc;
  }, []);
};
// TMP - dataset playback - END

const datasets = (
  metricsData,
  serviceOrInstanceMetrics,
  metricsUI,
  metricOptions = {
    duration: '1 hour',
    interval: '2 minutes'
  }
) =>
  serviceOrInstanceMetrics.map((soim) => {
    const dataset = find(metricsData.datasets, ['uuid', soim.dataset]);
    const dataSubset = getDataSubset(dataset.data, metricsUI, metricOptions);
    const minMax = getMinMax(dataset.data);
    return ({
      ...dataset,
      data: metricByInterval(dataSubset, minMax, metricOptions),
      type: find(metricsData.types, ['uuid', soim.type]),
      ...metricsUI[soim.dataset]
    });
  });

const servicesByProjectId = (projectId, metricOptions) => createSelector(
  [services, projectById(projectId), collapsedServices,
    instances, datacenters, metricsData, metricsUI],
  (services, project, collapsed, instances, datacenters, metrics, metricsUI) =>
  services.filter((s) => s.project === project.uuid)
  .map((service) => ({
    ...service,
    services: services.filter((s) => s.parent === service.uuid)
  }))
  .filter((s) => !s.parent)
  .map((service) => ({
    ...service,
    metrics: datasets(metrics, service.metrics, metricsUI, metricOptions),
    datacenters: instances.reduce((acc, instance) => {
      if(instance.service === service.uuid) {
        acc.push(instance);
      }
      return acc;
    }, []).map((instance) =>
      // TODO ensure uniqueness here
      find(datacenters, ['uuid', instance.datacenter])),
    collapsed: isCollapsed(collapsed, service.uuid),
    services: service.services.map((service) => ({
      ...service,
      metrics: datasets(metrics, service.metrics, metricsUI),
      collapsed: isCollapsed(collapsed, service.uuid)
    }))
  }))
);

const instancesByServiceId = (serviceId) => createSelector(
  [
    instances,
    serviceById(serviceId),
    collapsedInstances,
    metricsData,
    metricsUI
  ],
  (instances, service, collapsed, metrics, metricsUI) =>
  instances.filter((i) => i.service === service.uuid)
  .map((instance) => ({
    ...instance,
    metrics: datasets(metrics, instance.metrics, metricsUI),
    collapsed: isCollapsed(collapsed, instance.uuid)
  }))
);

const servicesForTopology = (projectId) => createSelector(
  [services, projectById(projectId)],
  (services, project) =>
  services.filter((s) => s.project === project.uuid)
  .reduce((acc, service, index, services) => {
    const getService = (s) => ({
      ...s,
      uuid: s.uuid,
      id: s.id,
      name: s.name,
      instances: instancesByServiceId(s.uuid).length,
      connections: s.connections,
      // tmp below
      datacentres: 2,
      metrics: [
        {
          name: 'CPU',
          value: '50%'
        },
        {
          name: 'Memory',
          value: '20%'
        },
        {
          name: 'Network',
          value: '2.9Kb/sec'
        }
      ],
      healthy: true
    });
    const findService = (a, s, p) => s.uuid === p ? s : a;
    if(service.parent) {
      let parent = acc.reduce((a, s) =>
        findService(a, s, service.parent), null);
      if(!parent) {
        parent = services.reduce((a, s) =>
          findService(a, s, service.parent), null);
        acc.push(parent);
      }
      if(!parent.children) {
        parent.children = [];
      }
      parent.children.push(
        getService(service)
      );
    }
    else {
      const s = acc.reduce((a, s, i) => s.uuid === service.uuid, null);
      if(!s) {
        acc.push(
          getService(service)
        );
      }
    }
    return acc;
  }, [])
);

const metricsByServiceId = (serviceId) => createSelector(
  [serviceById(serviceId), metricsData, metricsUI],
  (service, metrics, metricsUI) => datasets(metrics, service.metrics, metricsUI)
);

const metricTypeByUuid = (metricTypeUuid) => createSelector(
  [metricTypes],
  (metricTypes) => find(metricTypes, ['uuid', metricTypeUuid])
);


const instancesByProjectId = (projectId) => createSelector(
  [
    instances,
    projectById(projectId),
    collapsedInstances,
    metricsData,
    metricsUI
  ],
  (instances, project, collapsed, metrics, metricsUI) =>
  instances.filter((i) => i.project === project.uuid)
  .map((instance) => ({
    ...instance,
    metrics: datasets(metrics, instance.metrics, metricsUI),
    collapsed: isCollapsed(collapsed, instance.uuid)
  }))
);

const peopleByOrgId = (orgId) => createSelector(
  [members, orgById(orgId)],
  (members, org) => {
    const matched = [];
    if (Object.keys(org.members).length > 0) {
      org.members.filter((m) => {
        matched.push({
          ...find(members, ['uuid', m.uuid]),
          ...m
        });
      });
    }
    return matched;
  }
);

const peopleByProjectId = (projectId) => createSelector(
  [members, projectById(projectId)],
  (members, prj) => {
    const matched = [];
    if (Object.keys(prj.members).length > 0) {
      prj.members.filter((m) => {
        matched.push({
          ...find(members, ['uuid', m.uuid]),
          ...m
        });
      });
    }
    return matched;
  }
);

export {
  account as accountSelector,
  accountUi as accountUISelector,
  orgById as orgByIdSelector,
  orgs as orgsSelector,
  orgUI as orgUISelector,
  orgIndexById as orgIndexSelector,
  services as servicesSelector,
  serviceById as serviceByIdSelector,
  orgSections as orgSectionsSelector,
  projectUiSections as projectSectionsSelector,
  serviceUiSections as serviceSectionsSelector,
  projectsByOrgId as projectsByOrgIdSelector,
  projectById as projectByIdSelector,
  servicesByProjectId as servicesByProjectIdSelector,
  servicesForTopology as servicesForTopologySelector,
  instancesByServiceId as instancesByServiceIdSelector,
  metricsByServiceId as metricsByServiceIdSelector,
  metricTypes as metricTypesSelector,
  instancesByProjectId as instancesByProjectIdSelector,
  metricTypeByUuid as metricTypeByUuidSelector,
  peopleByOrgId as peopleByOrgIdSelector,
  members as membersSelector,
  peopleByProjectId as peopleByProjectIdSelector,
  projectsUI as projectUISelector,
  projectIndexById as projectIndexByIdSelect,
  serviceUiTooltip as serviceUiTooltipSelector,
  metricByInterval as metricByIntervalSelector
};
