/**
 * I18n dictionary for the en.
 */

const en = {
  app: {
    title: 'Application',
  },

  auth: {
    userNotFound: `Sorry, we don't recognize your credentials`,
    wrongPassword: `Sorry, we don't recognize your credentials`,
    weakPassword: 'This password is too weak',
    emailAlreadyInUse: 'Email is already in use',
    invalidEmail: 'Please provide a valid email',
    passwordReset: {
      invalidToken:
        'Password reset link is invalid or has expired',
      error: `Email not recognized`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Email verification link is invalid or has expired.',
      error: `Email not recognized.`,
      signedInAsWrongUser: `This email confirmation was sent to {0} but you're signed in as {1}.`,
    },
    passwordChange: {
      invalidPassword: 'The old password is invalid',
    },
  },

  user: {
    errors: {
      userAlreadyExists:
        'User with this email already exists.',
      userNotFound: 'User not found.',
      destroyingHimself: `You can't delete yourself.`,
      revokingOwnPermission: `You can't revoke your own admin permission.`,
      revokingPlanUser: `You can't revoke the admin permission of the plan manager.`,
      destroyingPlanUser: `You can't delete the plan manager.`,
    },
  },
  
  tenant: {
    userNotInTenant: "You cannot delete a workspace that you don't have access to",
    
    weeklyEvaluation: {
      successResponses: {
        evaluationsSuccessfullyDeleted: 'All evaluations were successfully deleted',
      },
      errors: {
        someEvaluationsUnsuccessfullyDeleted: 'Some of the evaluations could not be deleted',
        allEvaluationsUnsuccessfullyDeleted: 'None of the evaluations could be deleted',
        notFound: 'This weekly evaluation does not exist',
        nullStartDate: 'Invalid start date',
        nullEndDate: 'Invalid end date',
        invalidMetricGroup: 'Invalid metric group',
        notSameUser: 'You cannot manage a weekly evaluation that does not belong to you',
        startDateGreaterThanEndDate:
          'Start date greater than end date',
      },
    },

    project: {
      successResponses: {
        invitesSentSuccessfully: 'All invitations were successfully sent',
      },
      errors: {
        inviteWithErrors: 'A problem has occurred while sending one or more invitations',
        noInvitesSent: 'None of the invitations could be sent',
        userNotInTenant: "The user is not in the project workspace",
        projectWithSameName: "A project with the same name already exists in this workspace"
      }
    },
    weeklyReport: {
      successResponses: {
        deleteReportSuccessfully:
          'All reports were successfully deleted',
      },
      errors: {
        someUnsuccessfullyDeleted: "An error has occured while deleting one or more reports",
        allUnsuccessfullyDeleted: "None of the reports could be deleted",
        notFound: 'This weekly report does not exist',
        rangeDateError:
          'This weekly evaluation is not available to be submitted',
        missingWeeklyEvaluationId:
          'You need to choose a weekly evaluation',
        missingProjectId: 'You need to choose a project',
        notInProject:
          "You do not belong to this project",
        notProfessorEvaluate: 'Only professors are able to evaluate reports',
        reportNotBelongToTenant: 'This report does not belong to this workspace',
          
        projectNotInTenant:
          'The chosen project does not belong to this workspace',
        notSameUser:
          'You cannot manage a weekly report created by other user',
        unique: {
          weeklyEvaluation:
            "You can't submit more than one report per evaluation",
        },
      },
    },
    exists:
      'There is already a workspace on this application.',
    url: {
      exists: 'This workspace URL is already in use.',
    },
    invitation: {
      notSameEmail: `This invitation was sent to {0} but you're signed in as {1}.`,
    },
    planActive: `There is a plan active for this workspace. Please cancel the plan first.`,
    stripeNotConfigured: 'Stripe is not configured.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  errors: {
    notFound: {
      message: 'Not Found',
    },
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
  },

  email: {
    error: `Email provider is not configured.`,
  },

  preview: {
    error:
      'Sorry, this operation is not allowed in preview mode.',
  },

  entities: {
    projectCharter: {
      errors: {
        unique: {},
      },
    },
    businessCase: {
      errors: {
        unique: {},
      },
    },
    benefitsManagementPlan: {
      errors: {
        unique: {},
      },
    },
    assumptionLog: {
      errors: {
        unique: {},
      },
    },
    stakeholderRegistration: {
      errors: {
        unique: {},
      },
    },
    projectManagementPlan: {
      errors: {
        unique: {},
      },
    },
    requirementsManagementPlan: {
      errors: {
        unique: {},
      },
    },
    requirementDocumentation: {
      errors: {
        unique: {},
      },
    },
    scopeManagementPlan: {
      errors: {
        unique: {},
      },
    },
    scheduleManagementPlan: {
      errors: {
        unique: {},
      },
    },
    projectScopeStatement: {
      errors: {
        unique: {},
      },
    },
    workbreakdownStructure: {
      errors: {
        unique: {},
      },
    },
    scheduleNetworkDiagram: {
      errors: {
        unique: {},
      },
    },
    activityList: {
      errors: {
        unique: {},
      },
    },
    resource: {
      errors: {
        unique: {},
      },
    },
    resourceRequirements: {
      errors: {
        unique: {},
      },
    },
    activityDurationEstimates: {
      errors: {
        unique: {},
      },
    },
    stakeholderCalendars: {
      errors: {
        unique: {},
      },
    },
    costManagementPlan: {
      errors: {
        unique: {},
      },
    },
    costEstimates: {
      errors: {
        unique: {},
      },
    },
    qualityManagementPlan: {
      errors: {
        unique: {},
      },
    },
    resourceManagementPlan: {
      errors: {
        unique: {},
      },
    },
    resourceBreakdownStructure: {
      errors: {
        unique: {},
      },
    },
  },
};

export default en;
