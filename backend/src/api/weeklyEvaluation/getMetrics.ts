import ApiResponseHandler from '../apiResponseHandler';
import GetMetricsService from '../../services/weeklyEvaluation/getMetricsService';
import PermissionChecker from '../../services/user/permissionChecker';
import Permissions from '../../security/permissions';

export default async (req, res, next) => {
  try {

    new PermissionChecker(req).validateHas(
      Permissions.values.availableEvaluations,
    );
    
    const payload =
      await new GetMetricsService(req).handle(req.params.id);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    console.error(error);
    await ApiResponseHandler.error(req, res, error);
  }
};
