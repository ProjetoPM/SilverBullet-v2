import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import Error403 from '../../errors/Error403';
import WeeklyEvaluationCreateService from '../../services/weeklyEvaluation/createService';

export default async (req, res, next) => {
  try {

  
    if (!req.currentUser || !req.currentUser.id) {
      throw new Error403(req.language);
    }
    new PermissionChecker(req).validateHas(
      Permissions.values.weeklyEvaluationCreate,
    );

    const payload = await new WeeklyEvaluationCreateService(req).create(
      req.body.data
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    console.error(error);
    await ApiResponseHandler.error(req, res, error);
  }
};
