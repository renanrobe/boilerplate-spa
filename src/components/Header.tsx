import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Button, ButtonGroup } from "react-bootstrap"

export const Header = (props) => {
  const history = useHistory()
  const { title, path } = props
  const { t } = useTranslation()

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-1">
        <div className="d-block mb-2 mb-md-0">
          <h4>{title}</h4>
        </div>
        {path && (
          <div className="btn-toolbar mb-2 mb-md-0">
            <ButtonGroup>
              <Button
                variant="outline-primary"
                onClick={() => history.push(path)}
              >
                <span> {t("BUTTON_NEW")}</span>
              </Button>
            </ButtonGroup>
          </div>
        )}
      </div>
    </>
  )
}
