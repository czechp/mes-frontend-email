import { useState } from "react"

export function useTextState(value="") {
    return useState({
        value: value,
        validated: false
    })
}