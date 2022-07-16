import Joi from 'joi';

type validateRegisterUserBodyProps = {
  username: string;
  email: string;
  password: string;
};

type validateLoginUserBodyProps = {
  email: string;
  password: string;
};

export const validateRegisterUserBody = async ({
  username,
  email,
  password,
}: validateRegisterUserBodyProps) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
  });

  return schema.validate({
    username,
    email,
    password,
  });
};

export const validateLoginUserBody = async ({
  email,
  password,
}: validateLoginUserBodyProps) => {
  const schema = Joi.object({
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
  });

  return schema.validate({
    email,
    password,
  });
};
