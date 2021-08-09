import type { RectangleShape } from './../../../shape/shape-types'
import { TLDrawState } from '../../tlstate'
import { mockDocument } from '../../test-helpers'

describe('Toggle command', () => {
  const tlstate = new TLDrawState()

  it('does, undoes and redoes command', () => {
    tlstate.loadDocument(mockDocument)
    tlstate.selectAll()

    expect(tlstate.getShape('rect2').isAspectRatioLocked).toBe(undefined)

    tlstate.toggleAspectRatioLocked()

    expect(tlstate.getShape('rect2').isAspectRatioLocked).toBe(true)

    tlstate.undo()

    expect(tlstate.getShape('rect2').isAspectRatioLocked).toBe(undefined)

    tlstate.redo()

    expect(tlstate.getShape('rect2').isAspectRatioLocked).toBe(true)
  })

  it('toggles on before off when mixed values', () => {
    tlstate.loadDocument(mockDocument)
    tlstate.setSelectedIds(['rect2'])
    expect(tlstate.getShape<RectangleShape>('rect1').isAspectRatioLocked).toBe(
      undefined
    )
    expect(tlstate.getShape<RectangleShape>('rect2').isAspectRatioLocked).toBe(
      undefined
    )
    tlstate.toggleAspectRatioLocked()
    expect(tlstate.getShape<RectangleShape>('rect1').isAspectRatioLocked).toBe(
      undefined
    )
    expect(tlstate.getShape<RectangleShape>('rect2').isAspectRatioLocked).toBe(
      true
    )
    tlstate.selectAll()
    tlstate.toggleAspectRatioLocked()
    expect(tlstate.getShape<RectangleShape>('rect1').isAspectRatioLocked).toBe(
      true
    )
    expect(tlstate.getShape<RectangleShape>('rect1').isAspectRatioLocked).toBe(
      true
    )
    tlstate.toggleAspectRatioLocked()
    expect(tlstate.getShape<RectangleShape>('rect1').isAspectRatioLocked).toBe(
      false
    )
    expect(tlstate.getShape<RectangleShape>('rect1').isAspectRatioLocked).toBe(
      false
    )
  })
})