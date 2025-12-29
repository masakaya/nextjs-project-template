import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Counter } from './counter'

describe('Counter', () => {
  it('should render with initial count', () => {
    render(<Counter initialCount={5} />)
    expect(screen.getByTestId('count')).toHaveTextContent('5')
  })

  it('should render with default count of 0', () => {
    render(<Counter />)
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('should increment count when + button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter initialCount={0} />)

    await user.click(screen.getByTestId('increment'))

    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('should decrement count when - button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter initialCount={5} />)

    await user.click(screen.getByTestId('decrement'))

    expect(screen.getByTestId('count')).toHaveTextContent('4')
  })

  it('should reset count to 0 when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter initialCount={10} />)

    await user.click(screen.getByTestId('reset'))

    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })
})
