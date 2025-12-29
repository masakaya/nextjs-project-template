'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type CounterProps = {
  initialCount?: number
}

export function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount)

  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>Counter</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <span data-testid="count" className="text-4xl font-bold">
          {count}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCount((c) => c - 1)} data-testid="decrement">
            -
          </Button>
          <Button variant="outline" onClick={() => setCount((c) => c + 1)} data-testid="increment">
            +
          </Button>
        </div>
        <Button variant="secondary" onClick={() => setCount(0)} data-testid="reset">
          Reset
        </Button>
      </CardContent>
    </Card>
  )
}
