import { Input, Label } from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { User } from '../../User.type'

const ProfileFormView = (data?: User) => {
  const { t } = useTranslation('profile')

  return (
    <>
      <div className="space-y-2">
        <div>
          <Label>{t('full_name')}</Label>
          <Input readOnly value={data?.fullName}></Input>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <Label>{t('member_since')}</Label>
            <Input
              readOnly
              value={
                data?.createdAt
                  ? new Date(data.createdAt).toLocaleString()
                  : 'dd/mm/yyyy'
              }
            />
          </div>
          <div>
            <Label>{t('last_update')}</Label>
            <Input
              readOnly
              value={
                data?.updatedAt
                  ? new Date(data.updatedAt).toLocaleString()
                  : 'dd/mm/yyyy'
              }
            />
          </div>
        </div>
        <div>
          <Label>{t('email')}</Label>
          <Input readOnly value={data?.email}></Input>
        </div>
      </div>
    </>
  )
}

export { ProfileFormView }
