import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

const data = [
	{
		id: '1',
		icon: 'home',
		location: 'Home',
		destination: 'Klausdalsbrovej 32, Søborg, Denmark'
	},
	{
		id: '2',
		icon: 'briefcase',
		location: 'Work',
		destination: 'Pulsen 8, Roskilde, Denmark'
	}
]

const NavFavourites = () => {
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={() => (
				<View style={[tw`bg-gray-200`, { height: 0.5 }]} />
			)}
			renderItem={({ item }) => (
				<TouchableOpacity style={tw`flex-row items-center p-5`}>
					<Icon
						style={tw`mr-4 rounded-full bg-gray-300 p-3`}
						name={item.icon}
						type='ionicon'
						color='white'
						size={18}
					/>
					<View>
						<Text style={tw`font-semibold text-lg`}>{item.location}</Text>
						<Text style={tw`text-gray-500`}>{item.destination}</Text>
					</View>
				</TouchableOpacity>
			)}
		/>
	)
}

export default NavFavourites
