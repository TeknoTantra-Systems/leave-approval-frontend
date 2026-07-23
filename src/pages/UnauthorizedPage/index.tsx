function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">403</h1>
      <p className="text-xl mt-4">Unauthorized Access</p>
      <a href="/" className="mt-4 text-blue-600 hover:underline">Go Home</a>
    </div>
  )
}

export default UnauthorizedPage
