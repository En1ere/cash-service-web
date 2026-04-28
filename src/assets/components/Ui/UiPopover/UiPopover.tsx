import './UiPopover.scss'
import React, { useState, useRef, useEffect, useMemo } from 'react'

const UiPopover = ({
    additionalClass = 'popover',
    theme = 'default',
    shadow = false,
    size = 'm',
    withoutMobileView = false,
    sort = false,
    zIndex,
    children,
    parentElement,
    position = 'down-center',
    additionalOffsetBlock = { x: 0, y: 0 },
    additionalOffsetArrow = { x: 0, y: 0 },
    additionalScroll = 0,
}) => {
    const [scrollPosition, setScrollPosition] = useState(0)

    const [coordsBlock, setCoordsBlock] = useState({ x: 0, y: 0 })
    const [coordsArrow, setCoordsArrow] = useState({ x: 0, y: 0 })

    const [possiblePositions] = useState([
        'up-center',
        'up-left',
        'right-down',
        'right-center',
        'right-up',
        'down-left',
        'down-center',
        'down-right',
        'left-up',
        'left-center',
        'left-down',
        'up-right',
    ])

    const [hasFreeSpace, setHasFreeSpace] = useState(false)
    const [checkSpaceSmall, setCheckSpaceSmall] = useState(false)
    const [finalPosition, setFinalPosition] = useState('down-center')

    const [shown, setShown] = useState(true)
    const [firstCheckComplete, setFirstCheckComplete] = useState(false)
    const [circleComplete, setCircleComplete] = useState(false)

    const [idx, setIdx] = useState<number | null>(null)
    const [tempIdx, setTempIdx] = useState<number | null>(null)

    const popoverRef = useRef(null)

    if (!shown) return null

  // аналог this.$screen.width < 540
  const isSmallWidth = useMemo(() => {
      return window.innerWidth < 540
  }, [scrollPosition]) // можно привязать к resize/scroll если нужно

  // аналог getArrowDirection
  const getArrowDirection = useMemo(() => {
      if (
          finalPosition === 'down-center' ||
          finalPosition === 'down-left' ||
          finalPosition === 'down-right'
      ) {
          return 'up'
      } else if (
          finalPosition === 'up-center' ||
          finalPosition === 'up-left' ||
          finalPosition === 'up-right'
      ) {
          return 'down'
      } else if (
          finalPosition === 'right-center' ||
          finalPosition === 'right-down' ||
          finalPosition === 'right-up'
      ) {
          return 'left'
      } else if (
          finalPosition === 'left-center' ||
          finalPosition === 'left-down' ||
          finalPosition === 'left-up'
      ) {
          return 'right'
      }

      return ''
  }, [finalPosition])

  // аналог getParentSize
  const getParentSize = useMemo(() => {
      const fallback = { width: 0, height: 0 }

      if (!parentElement) return fallback

      const el = document.querySelector(parentElement)
      if (!el) return fallback

      const rect = el.getBoundingClientRect()

      return {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
      }
  }, [parentElement, scrollPosition])

  // аналог isBigArrow
  const isBigArrow = useMemo(() => {
      return size === 'm' || size === 'l'
  }, [size])

  // аналог getArrowUrl
  const getArrowUrl = useMemo(() => {
      if (!getArrowDirection) return false

      return `/images/default-info-popover/popover-arrow-${getArrowDirection}${
          isBigArrow ? '-big' : ''
      }${theme && theme !== 'default' ? theme : ''}${
          sort ? '-sort' : ''
      }.svg`
  }, [getArrowDirection, isBigArrow, theme, sort])

    const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        setScrollPosition(scrollTop)
    }

    const getCoords = () => {
        if (!parentElement) return { x: 0, y: 0 }

        const el = document.querySelector(parentElement)
        if (!el) return { x: 0, y: 0 }

        const rect = el.getBoundingClientRect()

        const x = Math.round(rect.left)
        const y = Math.round(rect.top + document.documentElement.scrollTop)

        return { x, y }
    }

    const getSelfWidth = () => {
        switch (size) {
            case 'l':
                return 340
            case 'm':
                return 260
            case 's':
                return 200
            case 'bxs':
                return 150
            case 'xs':
                return 140
            default:
                return 200
        }
    }

    const getSelfHeight = () => {
        return popoverRef.current?.getBoundingClientRect().height || 0
    }

    const choosePosition = () => {
        if (!(window.innerWidth - getSelfWidth() - 32)) {
            return
        }
        if (isSmallWidth && !withoutMobileView) {
            setCoords('up-center')
        } else {
            switch (position) {
                case 'up-center':
                    setCoords('up-center')
                    break
                case 'down-center':
                    setCoords('down-center')
                    break
                case 'left-center':
                    setCoords('left-center')
                    break
                case 'right-center':
                    setCoords('right-center')
                    break

                case 'up-left':
                    setCoords('up-left')
                    break
                case 'down-left':
                    setCoords('down-left')
                    break

                case 'up-right':
                    setCoords('up-right')
                    break
                case 'down-right':
                    setCoords('down-right')
                    break

                case 'right-up':
                    setCoords('right-up')
                    break
                case 'left-up':
                    setCoords('left-up')
                    break

                case 'right-down':
                    setCoords('right-down')
                    break
                case 'left-down':
                    setCoords('left-down')
                    break

                default:
                    setCoords('down-center')
                    break
            }
        }
    }
    const setCoords = (position: any) => {
        // TODO поментяь на Set
        if (idx === null) {
            setIdx(possiblePositions.indexOf(position))
        }
        if (tempIdx === null) {
            setTempIdx(possiblePositions.indexOf(position))
        }
        const x = getCoords().x
        const y = getCoords().y
        const parentWidth = getParentSize.width
        const parentHeight = getParentSize.height
        const selfWidth = getSelfWidth()
        const selfHeight = getSelfHeight()
        const verticalArrowWidth = isBigArrow ? 24 : 16
        const verticalArrowHeight = isBigArrow ? 12 : 8
        const horizontalArrowWidth = isBigArrow ? 12 : 8
        const horizontalArrowHeight = isBigArrow ? 24 : 16
        const elementDistance = 7
        const selfOffset = 20
        const mobileOffset = 16

        // Останавливаем цикл, если места на экране нет
        if (circleComplete) {
            setShown(false)
            return
        }

        if (isSmallWidth && !withoutMobileView) {
            switch (position) {
                case 'up-center':
                    coordsBlock.x = mobileOffset
                    coordsBlock.y = y - selfHeight - elementDistance - verticalArrowHeight

                    coordsArrow.x = x + parentWidth / 2 - verticalArrowWidth / 2
                    coordsArrow.y = y - elementDistance - verticalArrowHeight
                    break
                case 'down-center':
                    coordsBlock.x = mobileOffset
                    coordsBlock.y = y + parentHeight + elementDistance + verticalArrowHeight

                    coordsArrow.x = x + parentWidth / 2 - verticalArrowWidth / 2
                    coordsArrow.y = y + parentHeight + elementDistance
                    break
            }
            setFinalPosition(position)
            if (!checkSpaceSmall) {
                checkWindowFreeSpace(position)
                setCheckSpaceSmall(false)
            }
        } else {
            switch (position) {
                case 'up-center':
                    coordsBlock.x = x + parentWidth / 2 - selfWidth / 2
                    coordsBlock.y = y - selfHeight - elementDistance - verticalArrowHeight

                    coordsArrow.x = x + parentWidth / 2 - verticalArrowWidth / 2
                    coordsArrow.y = y - elementDistance - verticalArrowHeight
                    break
                case 'down-center':
                    coordsBlock.x = x + parentWidth / 2 - selfWidth / 2
                    coordsBlock.y = y + parentHeight + elementDistance + verticalArrowHeight

                    coordsArrow.x = x + parentWidth / 2 - verticalArrowWidth / 2
                    coordsArrow.y = y + parentHeight + elementDistance
                    break
                case 'left-center':
                    coordsBlock.x = x - selfWidth - elementDistance - horizontalArrowWidth
                    coordsBlock.y = y + parentHeight / 2 - selfHeight / 2

                    coordsArrow.x = x - elementDistance - horizontalArrowWidth
                    coordsArrow.y = y + parentHeight / 2 - horizontalArrowHeight / 2
                    break
                case 'right-center':
                    coordsBlock.x = x + parentWidth + elementDistance + horizontalArrowWidth
                    coordsBlock.y = y + parentHeight / 2 - selfHeight / 2

                    coordsArrow.x = x + parentWidth + elementDistance
                    coordsArrow.y = y + parentHeight / 2 - horizontalArrowHeight / 2
                    break

                case 'up-left':
                    coordsBlock.y = y - selfHeight - elementDistance - verticalArrowHeight
                    coordsBlock.x = x + parentWidth / 2 - verticalArrowWidth / 2 - selfOffset

                    coordsArrow.x = x + parentWidth / 2 - verticalArrowWidth / 2
                    coordsArrow.y = y - elementDistance - verticalArrowHeight
                    break
                case 'down-left':
                    coordsBlock.y = y + parentHeight + elementDistance + verticalArrowHeight
                    coordsBlock.x = x + parentWidth / 2 - verticalArrowWidth / 2 - selfOffset

                    coordsArrow.x = x + parentWidth / 2 - verticalArrowWidth / 2
                    coordsArrow.y = y + parentHeight + elementDistance
                    break

                case 'up-right':
                    coordsBlock.y = y - selfHeight - elementDistance - verticalArrowHeight
                    coordsBlock.x =
                        x +
                        parentWidth -
                        selfWidth -
                        parentWidth / 2 +
                        selfOffset +
                        verticalArrowWidth / 2

                    coordsArrow.x = x + parentWidth / 2 - verticalArrowWidth / 2
                    coordsArrow.y = y - elementDistance - verticalArrowHeight
                    break
                case 'down-right':
                    coordsBlock.y = y + parentHeight + elementDistance + verticalArrowHeight
                    coordsBlock.x =
                        x +
                        parentWidth -
                        selfWidth -
                        parentWidth / 2 +
                        selfOffset +
                        verticalArrowWidth / 2

                    coordsArrow.x = x + parentWidth / 2 - verticalArrowWidth / 2
                    coordsArrow.y = y + parentHeight + elementDistance
                    break

                case 'left-up':
                    coordsBlock.x = x - selfWidth - elementDistance - horizontalArrowWidth
                    coordsBlock.y = y - selfOffset

                    coordsArrow.y = y + parentHeight / 2 - horizontalArrowHeight / 2
                    coordsArrow.x = x - elementDistance - horizontalArrowWidth
                    break
                case 'right-up':
                    coordsBlock.x = x + parentWidth + elementDistance + horizontalArrowWidth
                    coordsBlock.y = y - selfOffset

                    coordsArrow.y = y + parentHeight / 2 - horizontalArrowHeight / 2
                    coordsArrow.x = x + parentWidth + elementDistance
                    break

                case 'left-down':
                    coordsBlock.x = x - selfWidth - elementDistance - horizontalArrowWidth
                    coordsBlock.y =
                        y +
                        parentHeight -
                        selfHeight -
                        parentHeight / 2 +
                        horizontalArrowHeight / 2 +
                        selfOffset

                    coordsArrow.y = y + parentHeight / 2 - horizontalArrowHeight / 2
                    coordsArrow.x = x - elementDistance - horizontalArrowWidth
                    break
                case 'right-down':
                    coordsBlock.x = x + parentWidth + elementDistance + horizontalArrowWidth
                    coordsBlock.y =
                        y +
                        parentHeight -
                        selfHeight -
                        parentHeight / 2 +
                        horizontalArrowHeight / 2 +
                        selfOffset

                    coordsArrow.y = y + parentHeight / 2 - horizontalArrowHeight / 2
                    coordsArrow.x = x + parentWidth + elementDistance
                    break

                default:
                    coordsBlock.x = x + parentWidth / 2 - selfWidth / 2
                    coordsBlock.y = y - selfHeight - elementDistance - verticalArrowHeight

                    coordsArrow.x = x + parentWidth / 2 - verticalArrowWidth / 2
                    coordsArrow.y = y - elementDistance - verticalArrowHeight
                    break
            }
            // checkWindowFreeSpace(position)
            setFinalPosition(position)

            if (!hasFreeSpace) {
                if (firstCheckComplete && idx === tempIdx) {
                    setCircleComplete(true)
                    return
                }

                const currentIdx = tempIdx ?? 0
                const nextIdx = (currentIdx + 1) % possiblePositions.length
                const nextPosition = possiblePositions[nextIdx]

                setTempIdx(nextIdx)
                setFirstCheckComplete(true)
                setFinalPosition(nextPosition)

                setTimeout(() => {
                    setCoords(nextPosition)
                }, 0)
            }

            coordsBlock.x += additionalOffsetBlock.x
            coordsBlock.y += additionalOffsetBlock.y
            coordsArrow.x += additionalOffsetArrow.x
            coordsArrow.y += additionalOffsetArrow.y
        }
    }
    const checkWindowFreeSpace = (position: any) => {
        const selfWidth = getSelfWidth()
        const selfHeight = getSelfHeight()
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight

        // отступы от края экрана
        const windowEdge = isSmallWidth ? 16 : 24

        // Проверка, есть ли место справа
        const spaceXR =
            windowWidth - coordsBlock.x + additionalOffsetBlock.x - selfWidth > windowEdge

        // Проверка, есть ли место слева
        const spaceXL = coordsBlock.x + additionalOffsetBlock.x > windowEdge

        // Проверка, есть ли место сверху
        const spaceYU = coordsBlock.y + additionalOffsetBlock.y - window.scrollY > windowEdge

        // Проверка, есть ли место снизу
        // TODO document.querySelector('html').scrollTop заменил на window.scrollY
        const spaceYD =
            windowHeight + window.scrollY - (coordsBlock.y + additionalOffsetBlock.y) - selfHeight >
            windowEdge

        // Выбор позиции поповера для ширины менее 540px
        if (isSmallWidth && !withoutMobileView) {
            setCheckSpaceSmall(true)
            if (spaceYU) {
                setCoords('up-center')
            } else {
                setCoords('down-center')
            }
        }
        if (!isSmallWidth) {
            // Есля для выбранной позиции нет места на экране - подбираем новую позицию по часовой стрелки (от 12 часов - 'up-center')
            switch (position) {
                case 'up-center':
                    if (spaceYU && spaceXR && spaceXL) {
                        setHasFreeSpace(true)
                    } else {
                        setHasFreeSpace(false)
                    }
                    break
                case 'down-center':
                    if (spaceXR && spaceXL && spaceYD) {
                        setHasFreeSpace(true)
                    } else {
                        setHasFreeSpace(false)
                    }
                    break
                case 'left-center':
                    if (spaceXL && spaceYU && spaceYD) {
                        setHasFreeSpace(true)
                    } else {
                        setHasFreeSpace(false)
                    }
                    break
                case 'right-center':
                    if (spaceXR && spaceYU && spaceYD) {
                        setHasFreeSpace(true)
                    } else {
                        setHasFreeSpace(false)
                    }
                    break

                case 'up-left':
                    if (spaceXR && spaceYU) {
                        setHasFreeSpace(true)
                    } else {
                        setHasFreeSpace(false)
                    }
                    break
                case 'down-left':
                    if (spaceXR && spaceYD) {
                        setHasFreeSpace(true)
                    } else {
                        setHasFreeSpace(false)
                    }
                    break

                case 'up-right':
                    if (spaceXL && spaceYU) {
                        setHasFreeSpace(true)
                    } else {
                        setHasFreeSpace(false)
                    }
                    break
                case 'down-right':
                    if (spaceXL && spaceYD) {
                        setHasFreeSpace(true)
                    } else {
                        setHasFreeSpace(false)
                    }
                    break

                case 'left-up':
                    if (spaceXL && spaceYD) {
                        setHasFreeSpace(true)
                    } else {
                        setHasFreeSpace(false)
                    }
                    break
                case 'right-up':
                    if (spaceXR && spaceYD) {
                        setHasFreeSpace(true)
                    } else {
                        setHasFreeSpace(false)
                    }
                    break

                case 'left-down':
                    if (spaceXL && spaceYU) {
                        setHasFreeSpace(true)
                    } else {
                        setHasFreeSpace(false)
                    }
                    break
                case 'right-down':
                    if (spaceXR && spaceYU) {
                        setHasFreeSpace(true)
                    } else {
                        setHasFreeSpace(false)
                    }
                    break
            }
        }
    }
    const showPopup = () => {
        setTimeout(() => {
            // TODO сомнительная шткуа понаблюдать
            // this.$forceUpdate();
            document
                .querySelector(`.default-popover-wrapper.${additionalClass}`)
                ?.classList.remove('hidden')
        }, 50)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        if (document.querySelector(parentElement)) {
            choosePosition()
            showPopup()
        }

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        choosePosition()
    }, [additionalScroll])

    useEffect(() => {
        choosePosition()
    }, [parentElement, position])

    const isVertical = [
        'up-center',
        'up-left',
        'up-right',
        'down-center',
        'down-left',
        'down-right',
    ].includes(finalPosition)

    const isHorizontal = [
        'right-center',
        'right-down',
        'right-up',
        'left-center',
        'left-down',
        'left-up',
    ].includes(finalPosition)

    return (
        <div className={[
            'default-popover-wrapper',
            'hidden',
            additionalClass,
        ].filter(Boolean).join(' ')}>
            <div
                className={[
                    'default-popover__arrow',
                    `${theme}-theme`,
                    isBigArrow && 'big',
                    shadow && 'shadow',
                    isVertical && 'default-popover__arrow_vertical',
                    isHorizontal && 'default-popover__arrow_horisontal',
                ]
                    .filter(Boolean)
                    .join(' ')}
                style={{
                    left: `${coordsArrow.x + additionalOffsetArrow.x}px`,
                    top: `${coordsArrow.y + additionalOffsetArrow.y}px`,
                }}
            >
                {getArrowUrl && <img loading="lazy" src={getArrowUrl} alt="arrow" />}
            </div>

            <div
                ref={popoverRef}
                className={[
                    'default-popover',
                    `${theme}-theme`,
                    isSmallWidth && 'mobile',
                    size === 'l' && 'size-l',
                    size === 'm' && 'size-m',
                    size === 's' && 'size-s',
                    size === 'bxs' && 'size-bxs',
                    size === 'xs' && 'size-xs',
                    isSmallWidth && !withoutMobileView && 'small-width',
                    shadow && 'shadow',
                    sort && 'sort',
                ].filter(Boolean).join(' ')}
                style={{
                    left: `${coordsBlock.x + additionalOffsetBlock.x}px`,
                    top: `${coordsBlock.y + additionalOffsetBlock.y + additionalScroll}px`,
                    zIndex: zIndex,
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default UiPopover
