import { Button } from "@/components/ui"
import { routes } from "@/routes/routes"
import { Link } from "react-router-dom"

const ProfileActions = () => {
  return (
    <div style={{ justifyContent: 'end', display: 'flex', flexWrap: 'wrap' }}>
      <Link to={routes.profile.edit}>
        <Button>
          <span>Editar perfil</span>
        </Button>
      </Link>
    </div>
  )
}

export { ProfileActions }
