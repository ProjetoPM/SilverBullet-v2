import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import GetWeeklyEvaluationService from '../../services/weeklyEvaluation/getWeeklyEvaluationService'; 

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.getWeeklyEvaluation,
    );

    const payload = await new GetWeeklyEvaluationService(req).findById(
      req.params.id,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
