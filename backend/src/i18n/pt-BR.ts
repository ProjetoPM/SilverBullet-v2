/**
 * I18n dictionary for the en.
 */

const ptBR = {
  app: {
    title: 'Aplicação',
  },

  auth: {
    userNotFound: `Desculpe, não reconhecemos suas credenciais`,
    wrongPassword: `Desculpe, não reconhecemos suas credenciais`,
    weakPassword: 'Esta senha é muito fraca',
    emailAlreadyInUse: 'O email já está sendo usado',
    invalidEmail: 'Por favor forneça um email válido',
    passwordReset: {
      invalidToken:
        'Link de redefinição de senha inválido ou expirado',
      error: `Email não encontrado`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Link de verificação de email inválido ou expirado.',
      error: `Email não encontrado.`,
      signedInAsWrongUser: `Esta confirmação de email foi enviada para {0} mas você está acessando como {1}.`,
    },
    passwordChange: {
      invalidPassword: 'A senha antiga é inválida',
    },
  },

  user: {
    errors: {
      userAlreadyExists: 'Usuário com este email já existe',
      userNotFound: 'Usuário não encontrado',
      destroyingHimself: `Você não pode deletar-se`,
      revokingOwnPermission: `Você não pode revogar sua própria permissão de proprietário`,
      revokingPlanUser: `Você não pode revogar a permissão do responsável pelo plano ativo`,
      destroyingPlanUser: `Você não pode deletar o responsável pelo plano ativo`,
    },
  },

  tenant: {
    exists: 'Já existe um inquilino para esta aplicação.',
    url: {
      exists:
        'Esta URL de área de trabalho já está em uso.',
    },
    invitation: {
      notSameEmail: `Este convite foi enviado para {0} mas você está acessando como {1}.`,
    },
    planActive: `Existe um plano ativo para esta área de trabalho. Por favor primeiro cancele o plano.`,
  },

  importer: {
    errors: {
      invalidFileEmpty: 'O arquivo está vazio',
      invalidFileExcel:
        'Apenas arquivos Excel (.xlsx) são permitidos',
      invalidFileUpload:
        'Arquivo inválido. Verifique se você está usando a última versão do modelo.',
      importHashRequired: 'Hash de importação é necessário',
      importHashExistent: 'Dados já foram importados',
    },
  },

  errors: {
    notFound: {
      message: 'Não encontrado',
    },
    forbidden: {
      message: 'Não permitido',
    },
    validation: {
      message: 'Ocorreu um erro',
    },
  },

  email: {
    error: `Email não configurado.`,
  },

  preview: {
    error:
      'Desculpe, esta operação não é permitida em modo de demonstração.',
  },

  entities: {
    projectCharter: {
      errors: {
        unique: {

        }
      }
    },
    businessCase: {
      errors: {
        unique: {

        }
      }
    },
    benefitsManagementPlan: {
      errors: {
        unique: {

        }
      }
    },
    assumptionLog: {
      errors: {
        unique: {

        }
      }
    },
    stakeholderRegistration: {
      errors: {
        unique: {

        }
      }
    },
    projectManagementPlan: {
      errors: {
        unique: {

        }
      }
    },
    requirementsManagementPlan: {
      errors: {
        unique: {

        }
      }
    },
    requirementDocumentation: {
      errors: {
        unique: {

        }
      }
    },
    scopeManagementPlan: {
      errors: {
        unique: {

        }
      }
    },
    scheduleManagementPlan: {
      errors: {
        unique: {

        }
      }
    },
    projectScopeStatement: {
      errors: {
        unique: {

        }
      }
    },
    workbreakdownStructure: {
      errors: {
        unique: {

        }
      }
    },
    scheduleNetworkDiagram: {
      errors: {
        unique: {

        }
      }
    },
    activityList: {
      errors: {
        unique: {

        }
      }
    },
    resource: {
      errors: {
        unique: {

        }
      }
    },
    resourceRequirements: {
      errors: {
        unique: {

        }
      }
    },
    activityDurationEstimates: {
      errors: {
        unique: {

        }
      }
    },
    stakeholderCalendars: {
      errors: {
        unique: {

        }
      }
    },
    costManagementPlan: {
      errors: {
        unique: {

        }
      }
    },
    costEstimates: {
      errors: {
        unique: {

        }
      }
    },
    qualityManagementPlan: {
      errors: {
        unique: {

        }
      }
    },
    resourceManagementPlan: {
      errors: {
        unique: {

        }
      }
    },
    resourceBreakdownStructure: {
      errors: {
        unique: {

        }
      }
    },
    communicationsManagementPlan: {
      errors: {
        unique: {

        }
      }
    },
    riskManagementPlan: {
      errors: {
        unique: {

        }
      }
    },
    riskRegistration: {
      errors: {
        unique: {

        }
      }
    },
    procurementManagementPlan: {
      errors: {
        unique: {

        }
      }
    },
    procurementStatementWorkRegister: {
      errors: {
        unique: {

        }
      }
    },
    projectPerformanceMonitoringReport: {
      errors: {
        unique: {

        }
      }
    },
    workPerformanceReports: {
      errors: {
        unique: {

        }
      }
    },
    issueLog: {
      errors: {
        unique: {

        }
      }
    },
    lessonLearnedRegister: {
      errors: {
        unique: {

        }
      }
    },
    qualityChecklist: {
      errors: {
        unique: {

        }
      }
    },
    teamPerformanceEvaluation: {
      errors: {
        unique: {

        }
      }
    },
    changeRequest: {
      errors: {
        unique: {

        }
      }
    },
    projectClosure: {
      errors: {
        unique: {

        }
      }
    },
    closedProcurementDocumentation: {
      errors: {
        unique: {

        }
      }
    },
    finalReport: {
      errors: {
        unique: {

        }
      }
    },
  }
};

export default ptBR;
