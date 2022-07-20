export const RESET_PASSWORD = "RESET_PASSWORD"

export const sendEmail = (dispatch, email) => {
    dispatch({
        type: RESET_PASSWORD,
        email: email
    })
}