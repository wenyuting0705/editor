import ajax from './base';

export const getRes = () => ajax({
  url: 'api.admin.behe.me/wise/airesult',
  method: 'GET',
});
export const getAna = data => ajax({
  data,
  url: `api.admin.behe.me/wise/effectanalysis?start_time=${data.start_time}&end_time=${data.end_time}`,
  method: 'GET',
});
export const getCount = data => ajax({
  data,
  url: `api.admin.behe.me/databox/daily?start_time=${data.start_time}&end_time=${data.end_time}`,
  method: 'GET',
});
