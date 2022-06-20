import { Col, Row, Image } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Logo from "../../assets/logo.png"
import { useTranslation } from "react-i18next"
import { Route } from "react-router-dom"

const LoginLayout = ({ children }) => {
  const { t } = useTranslation()
  return (
    <div id="background-login">
      <Container fluid>
        <Row>
          <Col sm={12} md={4} lg={3} className="d-flex align-items-center">
            <div className="m-3">Logo</div>
          </Col>
          <Col sm="12" md={{ span: 4, offset: 4 }} lg={{ span: 3, offset: 5 }}>
            <div className="login-form">
              <Row>
                <h2>{t("PROJECT_NAME")}</h2>
              </Row>
              <Row>{children}</Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const LoginLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <LoginLayout>
          <Component {...matchProps} />
        </LoginLayout>
      )}
    />
  )
}

export default LoginLayoutRoute
