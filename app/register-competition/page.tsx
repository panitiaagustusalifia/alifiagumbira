"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Loader2 } from "lucide-react"
import { InputField, TextareaField, SelectField } from "@/components/forms/form-field"
import { SuccessModal } from "@/components/forms/success-modal"
import { useParticipants } from "@/hooks/use-participants"
import { PageContainer } from "@/components/common/page-container"

export default function RegisterCompetition() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addParticipant } = useParticipants()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    team: "",
    competition: "",
    category: "",
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
  ]

  const competitions = {
    anak: [
      { value: "Memasukan Bola", label: "Memasukan Bola (2-4 Tahun)" },
      { value: "Memindahkan Bendera", label: "Memindahkan Bendera (2-4 Tahun)" },
      { value: "Memindahkan Bola Dengan Centong", label: "Memindahkan Bola Dengan Centong (2-4 Tahun)" },
      { value: "Memasukan Pensil Kedalam Botol", label: "Memasukan Pensil Kedalam Botol (5-8 Tahun)" },
      { value: "Estafet Kardus", label: "Estafet Kardus (5-8 Tahun)" },
      { value: "Memindahkan Gelas Menggunakan Balon", label: "Memindahkan Gelas Menggunakan Balon (5-8 Tahun)" },
      { value: "Makan Kerupuk", label: "Makan Kerupuk (9-12 Tahun)" },
      { value: "Jepit Balon", label: "Jepit Balon (9-12 Tahun)" },
      { value: "Joget Bola Dalam Kardus", label: "Joget Bola Dalam Kardus (9-12 Tahun)" },
    ],
    ibu: [
      { value: "Menghias Tumpeng", label: "Menghias Tumpeng" },
      { value: "Volly Balon Raksasa", label: "Volly Balon Raksasa" },
      { value: "Suit Jepang", label: "Suit Jepang" },
      { value: "Estafet Air", label: "Estafet Air" },
      { value: "Pukul Paku", label: "Pukul Paku" },
    ],
    bapak: [
      { value: "Tenis Meja", label: "Tenis Meja" },
      { value: "Balap Karung Raksasa", label: "Balap Karung Raksasa" },
      { value: "Volly Sarung", label: "Volly Sarung" },
      { value: "Gaple", label: "Gaple" },
      { value: "Tarik Tambang", label: "Tarik Tambang" },
      { value: "Lomba Mancing (Opsional)", label: "Lomba Mancing (Opsional)" },
    ],
  }

  const categories = [
    { value: "anak", label: "Lomba Anak-anak" },
    { value: "ibu", label: "Lomba Ibu-ibu" },
    { value: "bapak", label: "Lomba Bapak-bapak" },
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi"
    if (!formData.phone.trim()) newErrors.phone = "Nomor WhatsApp wajib diisi"
    if (!formData.team) newErrors.team = "Tim wajib dipilih"
    if (!formData.category) newErrors.category = "Kategori lomba wajib dipilih"
    if (!formData.competition) newErrors.competition = "Jenis lomba wajib dipilih"

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
      const success = await addParticipant({
        name: formData.name,
        phone: formData.phone,
        team: formData.team,
        competition: formData.competition,
        category: formData.category === "anak" ? "Anak-anak" : formData.category === "ibu" ? "Ibu-ibu" : "Bapak-bapak",
        notes: formData.notes,
      })

      if (success) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (isSubmitted) {
    return (
      <SuccessModal
        title="Pendaftaran Berhasil!"
        message="Terima kasih telah mendaftar. Data Anda telah tersimpan dan panitia akan menghubungi Anda untuk konfirmasi lebih lanjut."
        secondaryAction={{
          label: "Daftar Lomba Lain",
          onClick: () => {
            setIsSubmitted(false)
            setFormData({
              name: "",
              phone: "",
              team: "",
              competition: "",
              category: "",
              notes: "",
            })
          },
        }}
      />
    )
  }

  return (
    <PageContainer
      title="Pendaftaran Lomba"
      subtitle="Daftarkan diri untuk mengikuti lomba"
      backgroundColor="bg-green-600"
    >
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700">
              <UserPlus className="w-5 h-5 text-green-600" />
              Form Pendaftaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="space-y-4 text-gray-700">
                <InputField
                  label="Nama Lengkap"
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
                  description="Format: 08xxxxxxxxxx"
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

              {/* Competition Selection */}
              <div className="space-y-4">
                <SelectField
                  label="Kategori Lomba"
                  required
                  value={formData.category}
                  onChange={(value) => {
                    handleInputChange("category", value)
                    handleInputChange("competition", "") // Reset competition when category changes
                  }}
                  placeholder="Pilih kategori lomba"
                  options={categories}
                  error={errors.category}
                />

                {formData.category && (
                  <SelectField
                    label="Jenis Lomba"
                    required
                    value={formData.competition}
                    onChange={(value) => handleInputChange("competition", value)}
                    placeholder="Pilih jenis lomba"
                    options={competitions[formData.category as keyof typeof competitions] || []}
                    error={errors.competition}
                  />
                )}
              </div>

              {/* Additional Notes */}
              <TextareaField
                label="Catatan Tambahan"
                value={formData.notes}
                onChange={(value) => handleInputChange("notes", value)}
                placeholder="Catatan atau informasi tambahan (opsional)"
                rows={3}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Daftar Lomba"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg text-gray-700">Peraturan Penting</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Peserta hanya boleh mengikuti SATU jenis lomba saja</li>
              <li>• Peserta harus mewakili tim sesuai gang rumah</li>
              <li>• Peserta boleh digantikan jika berhalangan hadir</li>
              <li>• Wajib mengikuti peraturan pertandingan yang berlaku</li>
              <li>• Pendaftaran dapat dibatalkan maksimal H-2 sebelum lomba</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
