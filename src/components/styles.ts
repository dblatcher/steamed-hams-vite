import { colors } from "../constants"

export const row = { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, paddingBottom: 1 }
export const rowJustify = { ...row, justifyContent: 'space-between' }
export const rowLeft = { ...row, justifyContent: 'flex-start' }

export const frameStyle = {
    padding: 1,
    backgroundColor: colors.background,
    outlineColor: colors.borderOut,
    outlineWidth: 10,
    outlineStyle: 'solid',
    borderColor: colors.borderInner,
    borderStyle: 'solid',
    borderWidth: 10
}