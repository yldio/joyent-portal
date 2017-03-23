const test = require('ava');
const enzyme = require('enzyme');
const React = require('react');

const create = require('../helpers/create');

const {
  render
} = enzyme;

const {
  withIntl,
  withRouter
} = create;

test('renders <Projects> without exploding', (t) => {
  const Projects = require('@containers/projects').default.WrappedComponent;
  const wrapper = render(withRouter(withIntl(<Projects />)));
  t.deepEqual(wrapper.length, 1);
});

test('renders connected <Projects> without exploding', (t) => {
  const Projects = require('@containers/projects').default;
  const wrapper = render(create(<Projects />));
  t.deepEqual(wrapper.length, 1);
});

test('renders <Projects>\'s list of projects ', (t) => {
  const projects = [{
    id: 'forest-foundation-dev',
    name: 'Forest Foundation Dev',
    plan: '20.05$ per day'
  }, {
    id: 'forest-foundation-testing',
    name: 'Forest Foundation Testing',
    plan: '20.05$ per day'
  }, {
    id: 'forest-foundation-production',
    name: 'Forest Foundation Production',
    plan: '100.17$ per day'
  }];

  const Projects = require('@containers/projects').default.WrappedComponent;
  const wrapper = render(withRouter(withIntl(
    <Projects projects={projects} />
  )));

  const empty = wrapper.find('p[name=empty]');
  const ul = wrapper.find('ul[name=projects]');
  const li = ul.find('li');

  t.deepEqual(wrapper.length, 1);
  t.deepEqual(li.length, projects.length);
  t.deepEqual(empty.length, 0);
});

test('renders <Projects>\'s empty <p> when no projects ', (t) => {
  const Projects = require('@containers/projects').default.WrappedComponent;
  const wrapper = render(withRouter(withIntl(<Projects />)));

  const empty = wrapper.find('p[name=empty]');
  const ul = wrapper.find('ul[name=projects]');
  const li = ul.find('li');

  t.deepEqual(wrapper.length, 1);
  t.deepEqual(li.length, 0);
  t.deepEqual(empty.length, 1);
});
