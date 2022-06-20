import { ToastService } from "../../services/toast.service"
import { Form, Button, Col, Row, Spinner } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import AuthService from "../../services/auth.service"
import { UserCredentialsModel } from "../../models/userCredentials"
import { ResultRequestModel } from "../../models/resultRequest.model"
import storageService from "../../services/storage.service"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { Formik } from "formik"
import * as yup from "yup"
import i18n from "i18next"
import { setDefaultLocale } from "react-datepicker"

const Login = () => {
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation()
  const history = useHistory()

  const loginRequest = (user: UserCredentialsModel) => {
    setLoading(true)
    AuthService.login(user)
      .then((response: ResultRequestModel) => {
        if (response.success) {
          storageService.setUserLoggedIn(response.result)
          setDefaultLocale(
            response.result.user.idiom.shortName.replaceAll("-", "")
          )
          i18n.changeLanguage(
            response.result.user.idiom.shortName,
            (err, t) => {
              if (err) return console.log("something went wrong loading", err)
            }
          )
          if (
            response.result.user.profile.profileName === "admin" ||
            response.result.user.profile.profileName === "core"
          ) {
            history.push("/")
          } else {
            history.push("/DashboardBranch")
          }
        }
      })
      .catch((e: any) => {
        ToastService.error(t("ERROR_GENERIC"))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const initialValues: UserCredentialsModel = {
    login: "",
    password: ""
  }

  const schema = yup.object().shape({
    login: yup.string().required(t("REQUIRED")).email(t("EMAIL_VALIDATION")),
    password: yup.string().required(t("REQUIRED"))
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        loginRequest(values)
      }}
    >
      {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Floating className="mb-4">
            <Form.Control
              id="login"
              name="login"
              type="email"
              placeholder={t("LOGIN")}
              value={values?.login}
              onChange={handleChange}
              disabled={isLoading}
              isInvalid={touched.login && !!errors.login}
            />
            <Form.Control.Feedback type="invalid">
              {errors.login}
            </Form.Control.Feedback>
            <label htmlFor="login">{t("LOGIN")}</label>
          </Form.Floating>
          <Form.Floating className="mb-4">
            <Form.Control
              id="password"
              name="password"
              type="password"
              placeholder={t("PASSWORD")}
              value={values?.password}
              onChange={handleChange}
              disabled={isLoading}
              isInvalid={touched.password && !!errors.password}
            />
            <label htmlFor="floatingPasswordCustom">{t("PASSWORD")}</label>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Floating>
          <Row>
            <Col xs={8} sm={8} className="d-flex align-items-center">
              <Button
                variant="link"
                disabled={isLoading}
                onClick={() => {
                  history.push("/ForgotPassword")
                }}
              >
                {t("FORGOT_PASSWORD")}
              </Button>
            </Col>
            <Col xs={4} sm={4} className="d-flex justify-content-end">
              <Button variant="primary" type="submit" disabled={isLoading}>
                <>
                  {isLoading && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  {t("SIGN_IN")}
                </>
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}
export default Login
