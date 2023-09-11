import ApiResponseHandler from '../apiResponseHandler';
import GetEvaluationsByTenantService from '../../services/weeklyEvaluation/getEvaluationsByTenantService';
import PermissionChecker from '../../services/user/permissionChecker';
import Permissions from '../../security/permissions';

export default async (req, res, next) => {
  try {

    new PermissionChecker(req).validateHas(
      Permissions.values.getEvaluationsByProfessor,
    );
    
    const payload =
      await new GetEvaluationsByTenantService(req).handle();

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    console.error(error);
    await ApiResponseHandler.error(req, res, error);
  }
};
