export const Forms = {
  IR_NAME_F: 'INSTANCE_RESOURCE_NAME_FORM',
  IR_IMG_F: 'INSTANCE_RESOURCE_IMAGE_FORM',
  IR_PKG_F_SELECT: 'INSTANCE_RESOURCE_PACKAGE_FORM_SELECT',
  IR_PKG_F_FILTER: 'INSTANCE_RESOURCE_PACKAGE_FORM_FILTER',
  IR_NW_F: 'INSTANCE_RESOURCE_NETWORKS_FORM',
  IR_TAG_F_ADD: 'INSTANCE_RESOURCE_TAG_FORM_ADD',
  IR_TAG_F_EDIT: index => `INSTANCE_RESOURCE_TAG_FORM_EDIT_${index}`,
  IR_MD_F_ADD: 'INSTANCE_RESOURCE_METADATA_FORM_ADD',
  IR_MD_F_EDIT: index => `INSTANCE_RESOURCE_METADATA_FORM_EDIT_${index}`,
  IR_US_F: 'INSTANCE_RESOURCE_USERSCRIPT_FORM',
  IR_FW_F_ENABLED: 'INSTANCE_RESOURCE_FW_ENABLED',
  IR_FW_F_INACTIVE: 'INSTANCE_RESOURCE_FW_INACTIVE',
  IR_CNS_F: 'INSTANCE_RESOURCE_CNS_FORM',
  IR_AFF_F_ADD: 'INSTANCE_RESOURCE_AFFINITY_FORM_ADD',
  IR_AFF_F_EDIT: 'INSTANCE_RESOURCE_AFFINITY_FORM_EDIT'
};

export const Values = {
  IR_NAME_V_USE_RANDOM: 'INSTANCE_RESOURCE_NAME_VALUE_USE_RANDOM',
  IR_IMG_V_VMS: 'INSTANCE_RESOURCE_IMG_VALUE_VMS',
  IR_PKG_V_SORT_BY: 'INSTANCE_RESOURCE_PACKAGE_VALUE_SORT_BY',
  IR_PKG_V_SORT_ORDER: 'INSTANCE_RESOURCE_PACKAGE_VALUE_SORT_ORDER',
  IR_NW_V_INFO_EXPANDED: id =>
    `INSTANCE_RESOURCE_NETWORKS_VALUE_${id}_INFO_EXPANDED`,
  IR_NW_V_MACHINES_EXPANDED: id =>
    `INSTANCE_RESOURCE_NETWORKS_VALUE_${id}_MACHINES_EXPANDED`,
  IR_TAG_V_ADD_OPEN: 'INSTANCE_RESOURCE_TAG_VALUE_ADD_OPEN',
  IR_TAG_V_TAGS: 'INSTANCE_RESOURCE_TAG_VALUE_TAGS',
  IR_MD_V_ADD_OPEN: 'INSTANCE_RESOURCE_METADATA_VALUE_ADD_OPEN',
  IR_MD_V_MD: 'INSTANCE_RESOURCE_METADATA_VALUE_ADD_METADATA',
  IR_MD_F_ADD: 'INSTANCE_RESOURCE_METADATA_FORM_ADD',
  IR_MD_F_EDIT: index => `INSTANCE_RESOURCE_METADATA_FORM_EDIT_${index}`,
  IR_US_V_OPEN: 'INSTANCE_RESOURCE_USERSCRIPT_VALUE_OPEN',
  IR_CNS_V_ENABLED: 'INSTANCE_RESOURCE_CNS_VALUE_ENABLED',
  IR_CNS_V_SERVICES: 'INSTANCE_RESOURCE_CNS_VALUE_SERVICES',
  IR_AFF_V_ADD_OPEN: 'INSTANCE_RESOURCE_AFFINITY_VALUE_ADD_OPEN',
  IR_AFF_V_EDIT_OPEN: 'INSTANCE_RESOURCE_AFFINITY_VALUE_EDIT_OPEN',
  IR_AFF_V_AFF: 'INSTANCE_RESOURCE_AFFINITY_VALUE_AFFINITY'
};
