import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import Error403 from '../../errors/Error403';
import WeeklyReportCreateService from '../../services/weeklyReport/createService';

export default async (req, res, next) => {
  try {
    
    if (!req.currentUser || !req.currentUser.id) {
      throw new Error403(req.language);
    }
    new PermissionChecker(req).validateHas(
      Permissions.values.weeklyReportCreate,
    );

    const payload = await new WeeklyReportCreateService(req).create(
      req.body.data, req.language, req.params.tenantId, req.currentUser.id
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    console.error(error);
    await ApiResponseHandler.error(req, res, error);
  }
};
