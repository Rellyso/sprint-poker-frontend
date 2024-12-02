import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
  onDismiss: () => void
  isOpen: boolean
  onSubmit: (data: CreateStorySchema) => void
}

export function CreateStoryForm({
  onDismiss,
  isOpen,
  onSubmit,
}: CreateStoryFormProps) {
  const form = useForm<CreateStorySchema>({
    schema: createStorySchema,
  })

  return (
    <Dialog open={isOpen} onOpenChange={onDismiss}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar história</DialogTitle>
          <DialogDescription>Preencha os campos necessários</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex flex-col gap-2 md:flex-row">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem {...field}>
                    <FormLabel>Código</FormLabel>
                    <FormControl>
                      <Input placeholder="Código da história" />
                    </FormControl>
                    <FormDescription>
                      Identificador único da história
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem {...field} className="flex-1">
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título da história" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="link"
              control={form.control}
              render={({ field }) => (
                <FormItem {...field}>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a url da história" type="url" />
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
                <FormItem {...field}>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva sobre o que se trata..."
                      className="resize-y"
                    />
                  </FormControl>
                  <FormDescription>
                    Utilizada para acessar rapidamente a história
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onDismiss}>
                Cancelar
              </Button>
              <Button type="submit">
                <PlusCircle /> Adicionar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
