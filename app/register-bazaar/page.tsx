"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Store, Loader2 } from "lucide-react"
import { InputField, TextareaField, SelectField } from "@/components/forms/form-field"
import { SuccessModal } from "@/components/forms/success-modal"
import { useBazaar } from "@/hooks/use-bazaar"
import { PageContainer } from "@/components/common/page-container"

export default function RegisterBazaar() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addBazaarRegistration } = useBazaar()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    team: "",
    businessName: "",
    businessType: "",
    products: "",
    specialRequests: "",
    notes: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const teams = [
    { value: "Boulevard (Soedirman)", label: "Boulevard (Soedirman)" },
    { value: "Lotus Bougenville Senja (A. Yani)", label: "Lotus Bougenville Senja (A. Yani)" },
    { value: "Cendana (Pattimura)", label: "Cendana (Pattimura)" },
    { value: "Bintel Perdana (Diponegoro)", label: "Bintel Perdana (Diponegoro)" },
    { value: "Mangga Jambu Bhinneka (Cut Nyak Dhien)", label: "Mangga Jambu Bhinneka (Cut Nyak Dhien)" },
    { value: "Jati Kenari (Bung Tomo)", label: "Jati Kenari (Bung Tomo)" },
    { value: "Lainnya", label: "Lainnya" },
  ]

  const businessTypes = [
    { value: "Makanan & Minuman", label: "Makanan & Minuman" },
    { value: "Pakaian & Aksesoris", label: "Pakaian & Aksesoris" },
    { value: "Kerajinan Tangan", label: "Kerajinan Tangan" },
    { value: "Produk Kecantikan", label: "Produk Kecantikan" },
    { value: "Mainan Anak", label: "Mainan Anak" },
    { value: "Elektronik", label: "Elektronik" },
    { value: "Lainnya", label: "Lainnya" },
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Nama pemilik stand wajib diisi"
    if (!formData.phone.trim()) newErrors.phone = "Nomor WhatsApp wajib diisi"
    if (!formData.team) newErrors.team = "Tim wajib dipilih"
    if (!formData.businessName.trim()) newErrors.businessName = "Nama usaha/stand wajib diisi"
    if (!formData.businessType) newErrors.businessType = "Jenis usaha wajib dipilih"
    if (!formData.products.trim()) newErrors.products = "Deskripsi produk wajib diisi"

    // Validate phone number format
    if (formData.phone && !/^08\d{8,11}$/.test(formData.phone)) {
      newErrors.phone = "Format nomor WhatsApp tidak valid (contoh: 08123456789)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const success = await addBazaarRegistration(formData)

      if (success) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (isSubmitted) {
    return (
      <SuccessModal
        title="Pendaftaran Bazar Berhasil!"
        message="Terima kasih telah mendaftar. Panitia akan menghubungi Anda untuk konfirmasi lokasi stand dan detail lainnya."
        secondaryAction={{
          label: "Daftar Stand Lain",
          onClick: () => {
            setIsSubmitted(false)
            setFormData({
              name: "",
              phone: "",
              team: "",
              businessName: "",
              businessType: "",
              products: "",
              specialRequests: "",
              notes: "",
            })
          },
        }}
      />
    )
  }

  return (
    <PageContainer title="Pendaftaran Bazar" subtitle="Daftarkan stand bazar Anda" backgroundColor="bg-purple-600">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700">
              <Store className="w-5 h-5 text-purple-600" />
              Form Pendaftaran Bazar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <InputField
                  label="Nama Pemilik Stand"
                  required
                  value={formData.name}
                  onChange={(value) => handleInputChange("name", value)}
                  placeholder="Masukkan nama lengkap"
                  error={errors.name}
                />

                <InputField
                  label="Nomor WhatsApp"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(value) => handleInputChange("phone", value)}
                  placeholder="08xxxxxxxxxx"
                  error={errors.phone}
                />

                <SelectField
                  label="Tim/Gang"
                  required
                  value={formData.team}
                  onChange={(value) => handleInputChange("team", value)}
                  placeholder="Pilih tim sesuai gang rumah"
                  options={teams}
                  error={errors.team}
                />
              </div>

              {/* Business Info */}
              <div className="space-y-4">
                <InputField
                  label="Nama Usaha/Stand"
                  required
                  value={formData.businessName}
                  onChange={(value) => handleInputChange("businessName", value)}
                  placeholder="Contoh: Warung Makan Bu Sari"
                  error={errors.businessName}
                />

                <SelectField
                  label="Jenis Usaha"
                  required
                  value={formData.businessType}
                  onChange={(value) => handleInputChange("businessType", value)}
                  placeholder="Pilih jenis usaha"
                  options={businessTypes}
                  error={errors.businessType}
                />

                <TextareaField
                  label="Deskripsi Produk/Menu"
                  required
                  value={formData.products}
                  onChange={(value) => handleInputChange("products", value)}
                  placeholder="Jelaskan produk yang akan dijual, harga, dll."
                  rows={4}
                  error={errors.products}
                />
              </div>

              {/* Facility Needs */}
              <div className="space-y-4">
                <TextareaField
                  label="Permintaan Khusus"
                  value={formData.specialRequests}
                  onChange={(value) => handleInputChange("specialRequests", value)}
                  placeholder="Contoh: Butuh akses air, lokasi dekat parkir, dll."
                  rows={2}
                />
              </div>

              {/* Additional Notes */}
              <TextareaField
                label="Catatan Tambahan"
                value={formData.notes}
                onChange={(value) => handleInputChange("notes", value)}
                placeholder="Informasi tambahan yang perlu diketahui panitia"
                rows={3}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Daftar Bazar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Important Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Informasi Penting Bazar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Jadwal Bazar</h4>
                <p>Minggu, 17 Agustus 2025 - Bersamaan dengan acara puncak</p>
              </div>

              <ul className="space-y-2">
                <li>• Pendaftaran bazar GRATIS untuk warga RT/RW 06/06</li>
                <li>• Lokasi stand akan ditentukan oleh panitia</li>
                <li>• Penjual wajib menjaga kebersihan area stand</li>
                <li>• Dilarang menjual produk yang melanggar norma dan hukum</li>
                <li>• Setup stand mulai pukul 06:00 WIB</li>
                <li>• Bazar beroperasi dari pukul 08:00 - 18:00 WIB</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
