import { ToastService } from "../../services/toast.service"
import { Form, Button, Col, Row, Spinner } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import AuthService from "../../services/auth.service"
import { ResultRequestModel } from "../../models/resultRequest.model"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { Formik } from "formik"
import * as yup from "yup"

const ForgotPassword = () => {
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation()
  const history = useHistory()

  const forgotPasswordRequest = (login: string) => {
    setLoading(true)
    AuthService.forgotPassword(login)
      .then((response: ResultRequestModel) => {
        if (response.success) {
          ToastService.success(t("SUCCESS_FORGOT_PASSWORD"))
          history.push("/Login")
        }
      })
      .catch((e: any) => {
        ToastService.error(t("ERROR_GENERIC"))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const initialValues: any = {
    login: ""
  }

  const schema = yup.object().shape({
    login: yup.string().required(t("REQUIRED")).email(t("EMAIL_VALIDATION"))
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        forgotPasswordRequest(values.login)
      }}
    >
      {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Floating className="mb-4">
            <Form.Control
              id="login"
              name="login"
              type="email"
              placeholder="name@example.com"
              value={values.login}
              isInvalid={!!touched.login && !!errors.login}
              onChange={handleChange}
              disabled={isLoading}
            />
            <label htmlFor="floatingInputCustom">{t("LOGIN")}</label>
            <Form.Control.Feedback type="invalid">
              {errors.login}
            </Form.Control.Feedback>
          </Form.Floating>
          <Row>
            <Col xs={8} sm={8} className="d-flex align-items-center">
              <Button
                variant="link"
                disabled={isLoading}
                onClick={() => {
                  history.push("/Login")
                }}
              >
                {t("BACK_TO_LOGIN")}
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
                  {t("RECOVER_PASSWORD")}
                </>
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}
export default ForgotPassword
