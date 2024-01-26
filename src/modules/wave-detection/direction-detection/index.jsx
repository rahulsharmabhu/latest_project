import { useState } from 'react'
import '../../../assets/css/wave.css'
import { useOnAngleClickState } from '../../../app-redux/hooks/useOnAngleClickState'
import { useOnVideoClickState } from '../../../app-redux/hooks/useOnVideoClickState';
import CompassSvg from './compass-svg';


export const CompassIcon = () => {
	return (
		<svg className='compass-icon' viewBox='-15 -15 512 512' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="464.871" height="471.856" xmlSpace="preserve">
			<g>
				<image
					style={{
						stroke: 'none',
						strokeWidth: 0,
						strokeDasharray: 'none',
						strokeLinecap: 'butt',
						strokeDashoffset: 0,
						strokeLinejoin: 'miter',
						strokeMiterlimit: 4,
						fill: 'none',
						fillRule: 'nonzero',
						opacity: 1
					}}
					vectorEffect="non-scaling-stroke"
					xlinkHref="https://cdn.artboard.studio/private/social_6368c16d178378001c5235d4/projects/6368c171178378001c523602/ca39440c-a2c4-4b31-982b-0a50e97858cd-WhatsApp_Image_2023-05-23_at_15.49.07-removebg-preview.png"
					x="-149"
					y="-152"
					width="298"
					height="304"
					transform="matrix(1.56 0 0 1.5522 232.435 235.928)"
				/>
				<image
					style={{
						stroke: 'none',
						strokeWidth: 0,
						strokeDasharray: 'none',
						strokeLinecap: 'butt',
						strokeDashoffset: 0,
						strokeLinejoin: 'miter',
						strokeMiterlimit: 4,
						fill: 'none',
						fillRule: 'nonzero',
						opacity: 1
					}}
					vectorEffect="non-scaling-stroke"
					xlinkHref="https://cdn.artboard.studio/private/social_6368c16d178378001c5235d4/projects/6368c171178378001c523602/17f9de95-3f07-42ae-8509-4ee39f156d7a-circle-512.png"
					x="-256"
					y="-256"
					width="512"
					height="512"
					transform="translate(231.02 232.435) scale(.6956)"
				/>
				<image
					style={{
						stroke: 'none',
						strokeWidth: 0,
						strokeDasharray: 'none',
						strokeLinecap: 'butt',
						strokeDashoffset: 0,
						strokeLinejoin: 'miter',
						strokeMiterlimit: 4,
						fill: 'none',
						fillRule: 'nonzero',
						opacity: 1
					}}
					vectorEffect="non-scaling-stroke"
					xlinkHref="https://cdn.artboard.studio/private/social_6368c16d178378001c5235d4/projects/6368c171178378001c523602/1d50c348-95ea-44e9-9219-1dccc664a111-WhatsApp_Image_2023-05-23_at_15.48.55-removebg-preview.png"
					x="-43.5"
					y="-93.5"
					width="87"
					height="187"
					transform="matrix(1.7471 0 0 1.5992 229.322 240.382)"
				/>
			</g>
		</svg>
	);
};

const DirectionDetection = ({ object }) => {


	const { angleState ,setAngleClickState } = useOnAngleClickState()
	const [rotationDegree, setRotationDegree] = useState(0)
	const [active, setActive] = useState(false)
	const { videoState } = useOnVideoClickState()

	const angles = ['0', '22', '45', '67', '90', '113', '135', '158', '180', '203', '225', '248', '270', '293', '315', '338']
	const [boatState, setBoatState] = useState(0)

	const getAngle = (angle) => {
		setBoatState(angle);
		setAngleClickState({...angleState, angle:angle});
	}

	const handleRotate = (degree) => {
		if (object && object.type) {
			setRotationDegree(degree);
		}
	}

	const handleClick = (value) => {
		if (videoState) {
			getAngle(value);
			handleRotate(value);
		}
	}

	return (
		<div>
			<div className="compass_container">
				<div className="compass_wrapper">
					<div className="compass_pannel">
						<div className="compass_number">
							<ul className="number_list">
								{angles.map((value, index) => (
									<li key={index}
										onClick={() => {
											handleClick(value)
										}}
										className={`number num-${value} : ${active ? 'success' : 'dark'}`}>{value}</li>
								))}
							</ul>
						</div>
						<div className="svg-container" style={{ transform: `rotate(${rotationDegree}deg)` }}>
							<CompassSvg />
						</div>
					</div>
				</div>
			</div>
			<div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<p>Wave Relative to the boat is : &nbsp;</p>
				<h2>{boatState}<sup>o</sup></h2>
			</div>

		</div>
	)
}

export default DirectionDetection;