import ApiResponseHandler from '../apiResponseHandler';
import GetAvailableWeeklyEvaluationsService from '../../services/weeklyEvaluation/getAvailableWeeklyEvaluationsService';
import PermissionChecker from '../../services/user/permissionChecker';
import Permissions from '../../security/permissions';

export default async (req, res, next) => {
  try {

    new PermissionChecker(req).validateHas(
      Permissions.values.availableEvaluations,
    );
    
    const payload =
      await new GetAvailableWeeklyEvaluationsService(req).getAvailableWeeklyEvaluations();

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    console.error(error);
    await ApiResponseHandler.error(req, res, error);
  }
};
