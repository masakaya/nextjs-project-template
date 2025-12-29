import { Counter } from '@/components/features/counter'

export default function SamplePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl font-bold">Sample Page</h1>
      <Counter initialCount={0} />
    </div>
  )
}
