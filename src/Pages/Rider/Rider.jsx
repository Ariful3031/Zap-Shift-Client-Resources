import React from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData} from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/UseAuth';
export default function Rider() {

  const { register,
    handleSubmit,
    watch,
    //  formState: { errors } 
  } = useForm();
  const { user } = useAuth()
  // console.log(user)
  const axiosSecure = useAxiosSecure();
 
  // console.log(axiosSecure)
  const serviceCenters = useLoaderData();
  // console.log(serviceCenters)
  const reasonsDuplicate = serviceCenters.map(c => c.region)
  const reasons = [...new Set(reasonsDuplicate)]
  const reason = watch('reason')
  // const receiverReason = watch('receiverReason')
  // console.log(reasons)

  const districtByReasons = (reason) => {
    const reasonDistrict = serviceCenters.filter(c => c.region === reason)
    const districts = reasonDistrict.map(d => d.district)
    return districts;
  }
  const handleRider = (data) => {
    console.log(data)
    axiosSecure.post('/riders', data)
      .then(res => {
        if (res.data.insertedId) {

          Swal.fire({
            title: "Your application has been submitted. We will reach to you in 145 days",
            showConfirmButton: false,
            // text: "",
            icon: "success",
            timer: 2000
          });
        }
      })

  }
  return (
    <div className="px-25 py-20 bg-white mt-8">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <h1 className="text-5xl font-bold">Be a Rider</h1>
          <p className="mt-4">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
        </div>
        <div> </div>
      </div>
      <p className='border-b-2 w-full border-gray-200 mt-5'></p>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10 ">

        <form className='p-4 text-black' onSubmit={handleSubmit(handleRider)}>
          {/* Rider Details */}

          <h4 className="text-xl font-semibold mt-5">Tell us about yourself</h4>
          <fieldset className="fieldset mt-3 mb-8">
            {/* name */}
            <label className="label font-semibold text-xl">Name</label>
            <input defaultValue={user.displayName} type="text" {...register('name')} className="input w-full" placeholder="Your Name" />
            {/* License */}
            <label className="label font-semibold text-xl">Driving License Number</label>
            <input type="text" {...register('license')} className="input w-full" placeholder="License" />
            {/* email */}
            <label className="label font-semibold text-xl">Email</label>
            <input defaultValue={user?.email} type="email" {...register('email')} className="input w-full" placeholder="Your Email" />

            {/* Reasons */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Regions</legend>
              <select {...register('reason')} defaultValue="Pick a region" className="select w-full">
                <option disabled={true}>Pick a region</option>
                {
                  reasons.map((r, i) => <option key={i} value={r}>{r}</option>)
                }

              </select>
            </fieldset>
            {/* District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">District</legend>
              <select {...register('district')} defaultValue="Pick a district" className="select w-full">
                <option disabled={true}>Pick a district</option>
                {
                  districtByReasons(reason).map((r, i) => <option key={i} value={r}>{r}</option>)
                }

              </select>
            </fieldset>

            {/*NID number */}
            <label className="label font-semibold text-xl mt-3">NID No </label>
            <input type="number" {...register('nidNumber')} className="input w-full" placeholder="Your NID Number" />
            {/*phone number */}
            <label className="label font-semibold text-xl mt-3">Phone Number</label>
            <input type="number" {...register('phoneNumber')} className="input w-full" placeholder="Your Phone Number" />

            {/* Bike Brand Model and Year */}
            <label className="label font-semibold text-xl">Bike Brand Model and Year</label>
            <input type="text" {...register('bikeBrandModel')} className="input w-full" placeholder="Bike Brand Model and Year" />

            {/* Bike Registration Number*/}
            <label className="label font-semibold text-xl">Bike Registration Number</label>
            <input type="text" {...register('bikeRegistrationNumber')} className="input w-full" placeholder="Bike Registration Number" />

            {/* Tell Us About Yourself */}
            <label className="label font-semibold text-xl mt-3">Tell Us About Yourself</label>
            <textarea {...register('aboutYourself')} className="textarea w-full" placeholder="Tell Us About Yourself" />
          </fieldset>

          <button className='btn btn-primary text-black' type="submit">Submit</button>
        </form>
        <div>

        </div>
      </div>

    </div>
  )
}
