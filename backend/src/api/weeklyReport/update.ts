import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import Error403 from '../../errors/Error403';
import WeeklyReportUpdateService from '../../services/weeklyReport/updateService';

export default async (req, res, next) => {
  try {
    
    if (!req.currentUser || !req.currentUser.id) {
      throw new Error403(req.language);
    }
    new PermissionChecker(req).validateHas(
      Permissions.values.weeklyReportUpdate,
    );

    console.log(req.body.data);
    
    const payload = await new WeeklyReportUpdateService(req).update(
      req.params.id, req.body.data, req.language, req.params.tenantId, 
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    console.error(error);
    await ApiResponseHandler.error(req, res, error);
  }
};
