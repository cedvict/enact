/**
 * Exports the {@link moonstone/GridListImageItem.GridListImageItem} and
 * {@link moonstone/GridListImageItem.GridListImageItemBase} components. The default export is
 * {@link moonstone/GridListImageItem}.
 *
 * @module moonstone/GridListImageItem
 */

import kind from '@enact/core/kind';
import React, {PropTypes} from 'react';
import Spottable from '@enact/spotlight/Spottable';

import Icon from '../Icon';
import {Image} from '../Image';
import {MarqueeController, MarqueeText} from '../Marquee';

import css from './GridListImageItem.less';

const defaultPlaceholder =
	'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
	'9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cmVjdCB3aWR0aD0iMTAw' +
	'JSIgaGVpZ2h0PSIxMDAlIiBzdHlsZT0ic3Ryb2tlOiAjNDQ0OyBzdHJva2Utd2lkdGg6IDE7IGZpbGw6ICNhYW' +
	'E7IiAvPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHlsZT0ic3Ryb2tlOiAjNDQ0' +
	'OyBzdHJva2Utd2lkdGg6IDE7IiAvPjxsaW5lIHgxPSIxMDAlIiB5MT0iMCIgeDI9IjAiIHkyPSIxMDAlIiBzdH' +
	'lsZT0ic3Ryb2tlOiAjNDQ0OyBzdHJva2Utd2lkdGg6IDE7IiAvPjwvc3ZnPg==';

/**
 * {@link moonstone/GridListImageItem.GridListImageItemBase} is a stateless
 * GridListImageItem with Moonstone styling applied.
 *
 * @class GridListImageItemBase
 * @memberof moonstone/GridListImageItem
 * @ui
 * @public
 */
const GridListImageItemBase = kind({
	name: 'GridListImageItem',

	propTypes: /** @lends moonstone/GridListImageItem.GridListImageItemBase.prototype */ {
		/**
		 * The primary caption to be displayed with the image.
		 *
		 * @type {String}
		 * @public
		 */
		caption: PropTypes.string,

		/**
		 * When `true`, applies a selected visual effect to the image, but only if `selectionOverlayShowing`
		 * is also `true`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selected: PropTypes.bool,

		/**
		 * When `true`, a selection overlay with a centered icon is shown. When `selected` is true,
		 * a check mark is shown.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		selectionOverlayShowing: PropTypes.bool,

		/**
		 * The absolute URL path to the image.
		 *
		 * @type {String}
		 * @public
		 */
		source: PropTypes.string,

		/**
		 * The second caption line to be displayed with the image.
		 *
		 * @type {String}
		 * @public
		 */
		subCaption: PropTypes.string
	},

	defaultProps: {
		selected: false,
		selectionOverlayShowing: false
	},

	styles: {
		css,
		className: 'gridListImageItem'
	},

	computed: {
		className: ({caption, selected, styler, subCaption}) => styler.append(
			{selected},
			caption ? 'useCaption' : null,
			subCaption ? 'useSubCaption' : null
		)
	},

	render: ({caption, source, subCaption, selectionOverlayShowing, ...rest}) => {
		if (selectionOverlayShowing) {
			rest['role'] = 'checkbox';
			rest['aria-checked'] = rest.selected;
		}

		delete rest.selected;

		return (
			<div {...rest}>
				<Image className={css.image} placeholder={defaultPlaceholder} src={source} />
				{
					selectionOverlayShowing ? (
						<div className={css.overlayContainer}>
							<div className={css.overlayComponent}>
								<Icon className={css.icon}>check</Icon>
							</div>
						</div>
					) : null
				}
				{caption ? (<MarqueeText className={css.caption} marqueeOn="hover">{caption}</MarqueeText>) : null}
				{subCaption ? (<MarqueeText className={css.subCaption} marqueeOn="hover">{subCaption}</MarqueeText>) : null}
			</div>
		);
	}
});

/**
 * {@link moonstone/GridListImageItem} is a GridListImageItem with
 * Moonstone styling, Spottable applied.
 *
 * Usage:
 * ```
 * <GridListImageItem source="http://placehold.it/300x300/9037ab/ffffff&text=Image0" caption="image0" subCaption="sub-image0" />
 * ```
 *
 * @class GridListImageItem
 * @memberof moonstone/GridListImageItem
 * @mixes spotlight/Spottable
 * @see moonstone/GridListImageItem.GridListImageItemBase
 * @ui
 * @public
 */
const GridListImageItem = MarqueeController(
	{marqueeOnFocus: true},
	Spottable(
		GridListImageItemBase
	)
);

export default GridListImageItem;
export {GridListImageItem, GridListImageItemBase};