import ApiResponseHandler from '../apiResponseHandler';
import GetSubmissionService from '../../services/weeklyReport/getSubmissionsService';
import Error403 from '../../errors/Error403';
import PermissionChecker from '../../services/user/permissionChecker';
import Permissions from '../../security/permissions';

export default async (req, res, next) => {
  try {

    if (!req.currentUser || !req.currentUser.id) {
      throw new Error403(req.language);
    }
    new PermissionChecker(req).validateHas(
      Permissions.values.weeklyReportSubmissionsRead,
    );

    
    const payload =
      await new GetSubmissionService(req).getSubmissions();

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    console.error(error);
    await ApiResponseHandler.error(req, res, error);
  }
};
