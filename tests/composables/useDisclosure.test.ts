import { describe, it, expect } from 'vitest'
import { useDisclosure } from '../../src/composables/useDisclosure'

describe('useDisclosure', () => {
  it('defaults to closed', () => {
    const { isOpen } = useDisclosure()
    expect(isOpen.value).toBe(false)
  })

  it('accepts initial state', () => {
    const { isOpen } = useDisclosure(true)
    expect(isOpen.value).toBe(true)
  })

  it('open() sets isOpen to true', () => {
    const { isOpen, open } = useDisclosure()
    open()
    expect(isOpen.value).toBe(true)
  })

  it('close() sets isOpen to false', () => {
    const { isOpen, close } = useDisclosure(true)
    close()
    expect(isOpen.value).toBe(false)
  })

  it('toggle() flips isOpen', () => {
    const { isOpen, toggle } = useDisclosure()
    expect(isOpen.value).toBe(false)
    toggle()
    expect(isOpen.value).toBe(true)
    toggle()
    expect(isOpen.value).toBe(false)
  })

  it('multiple instances are independent', () => {
    const a = useDisclosure()
    const b = useDisclosure(true)
    expect(a.isOpen.value).toBe(false)
    expect(b.isOpen.value).toBe(true)
    a.open()
    expect(a.isOpen.value).toBe(true)
    expect(b.isOpen.value).toBe(true)
    b.close()
    expect(a.isOpen.value).toBe(true)
    expect(b.isOpen.value).toBe(false)
  })
})
