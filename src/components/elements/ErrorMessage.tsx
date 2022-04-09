import { FC } from "react";

const ErrorMessage: FC = () => {
	return(
		<div className="card red">
			<p className="card-title">Что-то пошло не так. Пожалуйста, обновите страницу</p>
		</div>
	)
}

export default ErrorMessage