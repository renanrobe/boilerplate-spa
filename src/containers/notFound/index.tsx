import { Button, Col, Container, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router"
import storageService from "../../services/storage.service"

const NotFound = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const user = storageService.getUser()

  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col
              xs={12}
              className="text-center d-flex align-items-center justify-content-center"
            >
              <div>
                <h1 className="text-primary mt-5">
                  {t("NOT_FOUND.PAGE")}{" "}
                  <span className="fw-bolder">{t("NOT_FOUND.NOT_FOUND")}</span>
                </h1>
                <p className="lead my-4">{t("NOT_FOUND.RESOURCE_NOT_FOUND")}</p>
                <Button
                  variant="primary"
                  className="animate-hover"
                  onClick={() => {
                    history.push(
                      user?.profile?.profileName === "operator"
                        ? "DashboardBranch"
                        : "Home"
                    )
                  }}
                >
                  {t("NOT_FOUND.BACK_TO_HOME_PAGE")}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  )
}
export default NotFound
