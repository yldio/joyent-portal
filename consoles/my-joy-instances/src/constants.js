export const Forms = {
  IC_AFF_F_ADD: 'INSTANCE_CREATION_AFFINITY_FORM_ADD',
  IC_AFF_F_EDIT: 'INSTANCE_CREATION_AFFINITY_FORM_EDIT',
  IC_CNS_F: 'INSTANCE_CREATION_CNS_FORM',
  IC_NAME_F: 'INSTANCE_CREATION_NAME_FORM',
  IC_FW_F_ENABLED: 'INSTANCE_CREATION_FW_ENABLED',
  IC_FW_F_INACTIVE: 'INSTANCE_CREATION_FW_INACTIVE',
  IC_IMG_F: 'INSTANCE_CREATION_IMAGE_FORM',
  IC_MD_F_ADD: 'INSTANCE_CREATION_METADATA_FORM_ADD',
  IC_MD_F_EDIT: index => `INSTANCE_CREATION_METADATA_FORM_EDIT_${index}`,
  IC_TAG_F_ADD: 'INSTANCE_CREATION_TAG_FORM_ADD',
  IC_TAG_F_EDIT: index => `INSTANCE_CREATION_TAG_FORM_EDIT_${index}`,
  IC_NW_F: 'INSTANCE_CREATION_NETWORKS_FORM',
  IC_PKG_F_SELECT: 'INSTANCE_CREATION_PACKAGE_FORM_SELECT',
  IC_PKG_F_FILTER: 'INSTANCE_CREATION_PACKAGE_FORM_FILTER',
  IC_US_F: 'INSTANCE_CREATION_USERSCRIPT_FORM',
  IC_F: 'INSTANCE_CREATION_FORM'
};

export const Values = {
  IC_SHOW_CLI: 'INSTANCE_CREATION_SHOW_CLI',
  IC_AFF_V_ADD_OPEN: 'INSTANCE_CREATION_AFFINITY_VALUE_ADD_OPEN',
  IC_AFF_V_EDIT_OPEN: 'INSTANCE_CREATION_AFFINITY_VALUE_EDIT_OPEN',
  IC_AFF_V_AFF: 'INSTANCE_CREATION_AFFINITY_VALUE_AFFINITY',
  IC_CNS_V_ENABLED: 'INSTANCE_CREATION_CNS_VALUE_ENABLED',
  IC_CNS_V_PROCEEDED: 'INSTANCE_CREATION_CNS_VALUE_PROCEEDED',
  IC_CNS_V_SERVICES: 'INSTANCE_CREATION_CNS_VALUE_SERVICES',
  IC_FW_V_PROCEEDED: 'INSTANCE_CREATION_FIREWALL_VALUE_PROCEEDED',
  IC_IMG_V_PROCEEDED: 'INSTANCE_CREATION_IMG_VALUE_PROCEEDED',
  IC_IMG_V_VMS: 'INSTANCE_CREATION_IMG_VALUE_VMS',
  IC_MD_V_PROCEEDED: 'INSTANCE_CREATION_METADATA_VALUE_PROCEEDED',
  IC_MD_V_ADD_OPEN: 'INSTANCE_CREATION_METADATA_VALUE_ADD_OPEN',
  IC_MD_V_MD: 'INSTANCE_CREATION_METADATA_VALUE_ADD_METADATA',
  IC_NAME_V_PROCEEDED: 'INSTANCE_CREATION_NAME_VALUE_PROCEEDED',
  IC_NAME_V_RANDOMIZING: 'INSTANCE_CREATION_NAME_VALUE_RANDOMIZING',
  IC_NW_V_PROCEEDED: 'INSTANCE_CREATION_NETWORKS_VALUE_PROCEEDED',
  IC_NW_V_INFO_EXPANDED: id =>
    `INSTANCE_CREATION_NETWORKS_VALUE_${id}_INFO_EXPANDED`,
  IC_NW_V_MACHINES_EXPANDED: id =>
    `INSTANCE_CREATION_NETWORKS_VALUE_${id}_MACHINES_EXPANDED`,
  IC_PKG_V_PROCEEDED: 'INSTANCE_CREATION_PACKAGE_VALUE_PROCEEDED',
  IC_PKG_V_SORT_BY: 'INSTANCE_CREATION_PACKAGE_VALUE_SORT_BY',
  IC_PKG_V_SORT_ORDER: 'INSTANCE_CREATION_PACKAGE_VALUE_SORT_ORDER',
  IC_TAG_V_PROCEEDED: 'INSTANCE_CREATION_TAG_VALUE_PROCEEDED',
  IC_TAG_V_ADD_OPEN: 'INSTANCE_CREATION_TAG_VALUE_ADD_OPEN',
  IC_TAG_V_TAGS: 'INSTANCE_CREATION_TAG_VALUE_TAGS',
  IC_US_V_PROCEEDED: 'INSTANCE_CREATION_USERSCRIPT_VALUE_PROCEEDED',
  IC_US_V_OPEN: 'INSTANCE_CREATION_USERSCRIPT_VALUE_OPEN',
  IC_V_VALIDATING: 'INSTANCE_CREATION_VALUE_VALIDATING'
};
