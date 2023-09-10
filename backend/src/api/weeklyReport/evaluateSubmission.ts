import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import Error403 from '../../errors/Error403';
import WeeklyReportEvaluateService from '../../services/weeklyReport/evaluateService';

export default async (req, res, next) => {
  try {
    
    if (!req.currentUser || !req.currentUser.id) {
      throw new Error403(req.language);
    }
    new PermissionChecker(req).validateHas(
      Permissions.values.evaluateWeeklyReport,
    );
    
    const payload = await new WeeklyReportEvaluateService(req).handle(
      req.params.id, req.body.data.score
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    console.error(error);
    await ApiResponseHandler.error(req, res, error);
  }
};
