import { zodResolver } from '@hookform/resolvers/zod'
import {
  DefaultValues,
  FieldValues,
  SubmitErrorHandler,
  UseFormHandleSubmit,
  useForm as useHookForm,
} from 'react-hook-form'
import { ZodType } from 'zod'
import { useToast } from './use-toast'

interface UseFormProps<T extends FieldValues> {
  schema: ZodType
  defaultValues?: DefaultValues<T>
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all'
}

export function useForm<T extends FieldValues>({
  schema,
  defaultValues,
  mode,
}: UseFormProps<T>) {
  const { toast } = useToast()
  const {
    register,
    setValue,
    watch,
    setError,
    handleSubmit,
    control,
    formState,
    getFieldState,
    trigger,
    resetField,
    clearErrors,
    getValues,
    ...other
  } = useHookForm<T>({
    mode: mode || 'onSubmit',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleErrors: SubmitErrorHandler<T> = (errors) => {
    const messagesArray = Object.values(errors)
    messagesArray.forEach(
      (error) => error?.message && toast({
        description: error.message as string,
        variant: 'destructive',
      }),
    )
  }

  const handleSubmitWrapper: UseFormHandleSubmit<T> = (
    onValidFields,
    onInvalidFields,
  ) => {
    return handleSubmit(onValidFields, (errors) => {
      onInvalidFields?.(errors)
      handleErrors(errors)
    })
  }

  return {
    control,
    setValue,
    register,
    handleSubmit: handleSubmitWrapper,
    formState,
    watch,
    setError,
    getFieldState,
    getValues,
    trigger,
    resetField,
    clearErrors,
    ...other,
  }
}
