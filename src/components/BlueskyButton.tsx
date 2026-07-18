import { useState } from 'react'
import { BLUE_SKY_BASE, TAGS } from '../constants'
import { Button, IconButton } from '@mui/material'

interface Props {
    postText: string
    label: string
    format?: 'text' | 'round'
}

const blueskyBlue = "#0a7aff"

// <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
const BluskyIcon = ({ size }: { size: number }) => (
    <svg
        fill={blueskyBlue}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512">
        <path d="M111.8 62.2C170.2 105.9 233 194.7 256 242.4c23-47.6 85.8-136.4 144.2-180.2c42.1-31.6 110.3-56 110.3 21.8c0 15.5-8.9 130.5-14.1 149.2C478.2 298 412 314.6 353.1 304.5c102.9 17.5 129.1 75.5 72.5 133.5c-107.4 110.2-154.3-27.6-166.3-62.9l0 0c-1.7-4.9-2.6-7.8-3.3-7.8s-1.6 3-3.3 7.8l0 0c-12 35.3-59 173.1-166.3 62.9c-56.5-58-30.4-116 72.5-133.5C100 314.6 33.8 298 15.7 233.1C10.4 214.4 1.5 99.4 1.5 83.9c0-77.8 68.2-53.4 110.3-21.8z" />
    </svg>
)

export const BlueskyButton: React.FunctionComponent<Props> = ({ postText, label, format = 'text' }) => {

    const [currentPage] = useState(() => window.location.href)

    const url = new URL(BLUE_SKY_BASE)
    url.searchParams.append('text', [postText, currentPage, ...TAGS].join(" "))

    switch (format) {
        case 'text':
            return <Button
                variant='outlined'
                startIcon={<BluskyIcon size={30} />}
                href={url.toString()}
                target="_blank">
                {label}
            </Button>
        case 'round':
            return <IconButton title={label}
                href={url.toString()}
                target="_blank">
                <BluskyIcon size={30} />
            </IconButton>
    }


}