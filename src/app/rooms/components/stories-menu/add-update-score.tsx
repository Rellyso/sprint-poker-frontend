import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useForm } from '@/hooks/use-form'
import {
  AddUpdateScoreSchema,
  addUpdateScoreSchema,
} from '@/schemas/add-update-score'

interface AddUpdateScoreProps {
  score: string | null | undefined
  onSubmit: (score: string) => void
}

export function AddUpdateScore({ score, onSubmit }: AddUpdateScoreProps) {
  const form = useForm<AddUpdateScoreSchema>({
    schema: addUpdateScoreSchema,
    defaultValues: {
      score: score || '',
    },
  })

  const handleSubmit = (data: AddUpdateScoreSchema) => {
    onSubmit(data.score)
  }

  return (
    <Popover>
      <PopoverTrigger className="ml-auto" asChild>
        <Button variant="ghost" size="icon">
          {score ? score : '-'}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-2 ml-auto"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="score"
              control={form.control}
              render={({ field }) => (
                <FormItem {...field}>
                  <FormControl>
                    <Input type="text" placeholder="Atribuir voto" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Salvar</Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
