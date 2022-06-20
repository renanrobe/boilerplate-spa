import { ToastService } from "../../services/toast.service"
import { Form, Button, Col, Row, Spinner } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import AuthService from "../../services/auth.service"
import { RecoveryPasswordModel } from "../../models/recoveryPassword.model"
import { ResultRequestModel } from "../../models/resultRequest.model"
import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Formik } from "formik"
import * as yup from "yup"

const RecoverPassword = () => {
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation()
  const history = useHistory()
  const { token } = useParams<{ token: string }>()

  const recoverPasswordRequest = (recover: RecoveryPasswordModel) => {
    setLoading(true)
    recover.recoveryToken = token
    AuthService.recoveryPassword(recover)
      .then((response: ResultRequestModel) => {
        if (response.success) {
          ToastService.success(t("SUCCESS_RECOVER_PASSWORD"))
          history.push("/")
        }
      })
      .catch((e: any) => {
        ToastService.error(t("ERROR_GENERIC"))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const initialValues: RecoveryPasswordModel = {
    password: "",
    confirmPassword: "",
    recoveryToken: token
  }

  const schema = yup.object().shape({
    password: yup.string().required(t("REQUIRED")),
    confirmPassword: yup
      .string()
      .required(t("REQUIRED"))
      .oneOf([yup.ref("password"), null], t("PASSWORD_VALIDATION_MATCH"))
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        recoverPasswordRequest(values)
      }}
    >
      {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Floating className="mb-4">
            <Form.Control
              id="password"
              name="password"
              type="password"
              placeholder={t("PASSWORD")}
              onChange={handleChange}
              value={values?.password}
              isInvalid={!!touched.password && !!errors.password}
              disabled={isLoading}
            />
            <label htmlFor="password">{t("PASSWORD")}</label>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Floating>
          <Form.Floating className="mb-4">
            <Form.Control
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder={t("CONFIRM_PASSWORD")}
              onChange={handleChange}
              value={values?.confirmPassword}
              isInvalid={!!touched.confirmPassword && !!errors.confirmPassword}
              disabled={isLoading}
            />
            <label htmlFor="floatingPasswordCustom">
              {t("CONFIRM_PASSWORD")}
            </label>
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
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
                  {t("SEND")}
                </>
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}
export default RecoverPassword
