import React, { useState } from "react";
import useLoginModal from "../../hooks/useLoginModal";
import { useCallback } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "../../hooks/useRegisterModal";

const LoginModal = () => {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onToggle = useCallback(() => {
		if (isLoading) {
			return;
		}

		loginModal.onClose();
		registerModal.onOpen();
	}, [isLoading, loginModal, registerModal]);

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);

			// TODO ADD LOGIN

			loginModal.onClose();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, [loginModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Input
				placeholder="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				disabled={isLoading}
			/>
			<Input
				placeholder="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				disabled={isLoading}
			/>
		</div>
	);

	const footerContent = (
		<div className="text-neutral-400 text-center mt-4">
			<p>
				First time using Twiiter?
				<span onClick={onToggle} className="text-white hover:underline cursor-pointer">
					{" "}
					Create an account
				</span>
			</p>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="login"
			actionLabel="Sign in"
			onClose={loginModal.onClose}
			onSubmit={onSubmit}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
