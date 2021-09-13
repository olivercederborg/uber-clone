import { useNavigation } from '@react-navigation/core'
import React from 'react'
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectOrigin } from '../slices/navSlice'

const data = [
	{
		id: '1',
		title: 'Get a ride',
		image: 'https://links.papareact.com/3pn',
		screen: 'MapScreen'
	},
	{
		id: '2',
		title: 'Order food',
		image: 'https://links.papareact.com/28w',
		screen: 'EatsScreen'
	}
]

const NavOptions = () => {
	const navigation = useNavigation()
	const origin = useSelector(selectOrigin)

	return (
		<View>
			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				horizontal
				renderItem={({ item }) => (
					<TouchableOpacity
						disabled={!origin}
						onPress={() => navigation.navigate(item.screen)}
						style={tw`pl-6 pr-2 bg-gray-200 py-6 mr-4 w-40`}>
						<View style={tw`${!origin && 'opacity-20'}`}>
							<Image
								style={{
									width: 120,
									height: 120,
									resizeMode: 'contain'
								}}
								source={{ uri: item.image }}
							/>
							<Text style={tw`mt-2 text-lg font-semibold`}>
								{item.title}
							</Text>
							<Icon
								type='antdesign'
								name='arrowright'
								color='white'
								style={tw`p-2 rounded-full bg-black w-10 mt-4`}
							/>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	)
}

export default NavOptions
