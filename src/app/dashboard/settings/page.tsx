import { requireUser } from "@/lib/auth";

export default async function SettingsPage() {
    const user = await requireUser()

    return (
        <div className="card-ui p-8">
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="mt-2 text-slate-300">
                Manage your account information.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <h2 className="text-lg font-semibold text-white">Full Name</h2>
                    <p className="mt-2 text-slate-300">{user.name}</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <h2 className="text-lg font-semibold text-white">Email Address</h2>
                    <p className="mt-2 text-slate-300">{user.email}</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <h2 className="text-lg font-semibold text-white">Current Plan</h2>
                    <p className="mt-2 text-slate-300">{user.plan}</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <h2 className="text-lg font-semibold text-white">Account Status</h2>
                    <p className="mt-2 text-slate-300">Active</p>
                </div>
            </div>
        </div>
    )
}