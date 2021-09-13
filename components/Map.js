import React, { useEffect, useRef } from 'react'
import { View, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import {
	selectDestination,
	selectOrigin,
	setTravelTimeInformation
} from '../slices/navSlice'
import { GOOGLE_APIKEY } from '@env'
import { useDispatch } from 'react-redux'

const Map = () => {
	const origin = useSelector(selectOrigin)
	const destination = useSelector(selectDestination)
	const mapRef = useRef(null)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!origin || !destination) return

		mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
			edgePadding: 50
		})
	}, [origin, destination])

	useEffect(() => {
		const getTravelTime = async () => {
			if (!origin || !destination) return
			try {
				const res = await fetch(
					`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_APIKEY}`
				)
				const data = await res.json()
				console.log(data)
				dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
			} catch (error) {
				console.error(error)
			}
		}

		getTravelTime()
	}, [origin, destination, GOOGLE_APIKEY])
	return (
		<MapView
			ref={mapRef}
			style={tw`flex-1`}
			initialRegion={{
				latitude: origin.location.lat,
				longitude: origin.location.lng,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005
			}}
			mapType='mutedStandard'>
			{origin && destination && (
				<MapViewDirections
					origin={origin.description}
					destination={destination.description}
					apikey={GOOGLE_APIKEY}
					strokeWidth={6}
					strokeColor='black'
				/>
			)}
			{origin?.location && (
				<Marker
					title='Origin'
					description={origin.description}
					identifier='origin'
					coordinate={{
						longitude: origin.location.lng,
						latitude: origin.location.lat
					}}
				/>
			)}
			{destination?.location && (
				<Marker
					title='Destination'
					description={destination.description}
					identifier='destination'
					coordinate={{
						longitude: destination.location.lng,
						latitude: destination.location.lat
					}}
				/>
			)}
		</MapView>
	)
}

export default Map
