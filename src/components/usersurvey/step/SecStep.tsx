import React, { useEffect, useState } from 'react';
import { PostFormRequest, PostFormType, UserSurveyFormDataType } from '@/types/api/formTypes';
import FormElements from '@/components/usersurvey/FormElements';
import { UserSurveyForm, useUserSurveyForm } from '@/store/userSurvey';
import Requirement from '@/components/usersurvey/components/Requirement';
import { UserSurveyFormSubmitButton } from '@/styles/survey.styled';
import { useMutation } from '@tanstack/react-query';
import { submitForm } from '@/apis/form';

interface SecStepProps {
  userSurveyFormData: UserSurveyFormDataType[];
}
function SecStep({ userSurveyFormData }: SecStepProps) {
  const { mutate } = useMutation(submitForm, {
    onSuccess: () => {
      setUserSurveyForm([]);
    },
  });
  const [formValue, setFormValue] = useState<UserSurveyForm[]>([]);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const { setUserSurveyForm, userSurveyForm, price } = useUserSurveyForm();
  const checkRequiredQuestions = (formValue: UserSurveyForm[]) => {
    const requiredQuestionsIndex = userSurveyFormData
      .filter((data) => data.required)
      .map((data) => data.questionNumber);

    const isAllRequiredQuestionsAnswered = requiredQuestionsIndex.every((questionNumber) => {
      return formValue.some((data) => data.questionNumber === questionNumber);
    });

    setIsValid(isAgreed && isAllRequiredQuestionsAnswered);
  };

  const handleSubmit = () => {
    const copiedForm = [...formValue, ...userSurveyForm];

    const addressFront = copiedForm.find((data) => data.questionIdentify === 'ADDRESS');

    console.log(addressFront);
    if (!addressFront) return alert('주소를 입력해주세요');

    const postForm: PostFormRequest = {
      submit: copiedForm as PostFormType[],
      price,
      addressFront: addressFront?.answer.split(' ')[1],
      servicePerson: 1,
    };

    console.log(postForm);

    setUserSurveyForm(copiedForm);
    mutate(postForm);
  };

  useEffect(() => {
    checkRequiredQuestions(formValue);
  }, [formValue, isAgreed]);
  return (
    <div className="form-container">
      {userSurveyFormData.map((data, index) => (
        <FormElements data={data} key={index} handleUpdateFormValue={setFormValue} />
      ))}
      <Requirement handleAgree={setIsAgreed} />
      <UserSurveyFormSubmitButton
        animate={isValid ? { backgroundColor: '#0061FF', color: '#fff' } : ''}
        onClick={handleSubmit}
      >
        예약하기
      </UserSurveyFormSubmitButton>
    </div>
  );
}

export default SecStep;
