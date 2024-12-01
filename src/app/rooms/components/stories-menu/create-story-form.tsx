import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from '@/hooks/use-form'
import { CreateStorySchema, createStorySchema } from '@/schemas/create-story'
import { PlusCircle } from 'lucide-react'

interface CreateStoryFormProps {
  onSubmit: (data: CreateStorySchema) => void
}

export function CreateStoryForm({ onSubmit }: CreateStoryFormProps) {
  const form = useForm<CreateStorySchema>({
    schema: createStorySchema,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input placeholder="Código da história" {...field} />
              </FormControl>
              <FormDescription>Identificador único da história</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título da história" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="link"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite a url da história"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Utilizada para acessar rapidamente a história
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva sobre o que se trata..."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Utilizada para acessar rapidamente a história
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <PlusCircle /> Adicionar
        </Button>
      </form>
    </Form>
  )
}
