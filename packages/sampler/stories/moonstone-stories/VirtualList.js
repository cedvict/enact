import Item from '@enact/moonstone/Item';
import {VirtualList as UiVirtualList} from '@enact/ui/VirtualList';
import {VirtualList, VirtualListBase} from '@enact/moonstone/VirtualList';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {boolean, number} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';
import SpotlightVirtualListWithDisabledItemsDecorator from '@enact/moonstone/VirtualList/SpotlightVirtualListWithDisabledItemsDecorator';

import nullify from '../../src/utils/nullify.js';
import {mergeComponentMetadata} from '../../src/utils/propTables';

const Config = mergeComponentMetadata('VirtualList', VirtualListBase, VirtualList);

const
	items = [],
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = (size) => ({index, ...rest}) => {
		const itemStyle = {
			height: size + 'px',
			borderBottom: ri.unit(3, 'rem') + ' solid #202328',
			boxSizing: 'border-box'
		};

		return (
			<Item {...rest} disabled={items[index].disabled} style={itemStyle}>
				{items[index].content}
			</Item>
		);
	};

for (let i = 0; i < 1000; i++) {
	items.push({content: 'Item ' + ('00' + i).slice(-3), disabled: !(i % 3) || 20 < i && i < 40});
}

storiesOf('UI', module)
	.add(
		'VirtualList',
		withInfo({
			propTables: [Config],
			text: 'Basic usage of VirtualList'
		})(() => {
			const itemSize = ri.scale(number('itemSize', 72));
			return (
				<UiVirtualList
					component={renderItem(itemSize)}
					dataSize={number('dataSize', items.length)}
					itemSize={itemSize}
					onScrollStart={action('onScrollStart')}
					onScrollStop={action('onScrollStop')}
					spacing={ri.scale(number('spacing', 0))}
					style={{
						height: ri.unit(552, 'rem')
					}}
				/>
			);
		})
	);

storiesOf('Moonstone', module)
	.add(
		'VirtualList',
		withInfo({
			propTables: [Config],
			text: 'Basic usage of VirtualList'
		})(() => {
			const itemSize = ri.scale(number('itemSize', 72));
			return (
				<SpotlightVirtualListWithDisabledItemsDecorator
					data={items}
					render={(props) => ( // eslint-disable-line react/jsx-no-bind
						<VirtualList
							{...props}
							component={renderItem(itemSize)}
							dataSize={number('dataSize', items.length)}
							focusableScrollbar={nullify(boolean('focusableScrollbar', false))}
							itemSize={itemSize}
							onScrollStart={action('onScrollStart')}
							onScrollStop={action('onScrollStop')}
							spacing={ri.scale(number('spacing', 0))}
							style={{
								height: ri.unit(552, 'rem')
							}}
						/>
					)}
				/>
			);
		})
	);
