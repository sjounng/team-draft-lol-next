"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";
import { ErrorAlert } from "../components/ErrorAlert";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { FormDivider } from "../components/FormDivider";
import { CustomSelect } from "../components/CustomSelect";

const LANES = ["TOP", "JGL", "MID", "ADC", "SUP"];

export function RegisterForm() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    riotAccount: "", // id#tag 형식
    mainLane: "",
    subLane: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (formData.password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    if (formData.mainLane && formData.mainLane === formData.subLane) {
      setError("메인 포지션과 서브 포지션은 달라야 합니다.");
      return;
    }

    setLoading(true);

    try {
      // Split riot account by #
      let riotId: string | undefined;
      let riotTag: string | undefined;

      if (formData.riotAccount) {
        const parts = formData.riotAccount.split("#");
        riotId = parts[0]?.trim() || undefined;
        riotTag = parts[1]?.trim() || undefined;
      }

      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        name: formData.name || undefined,
        riotId,
        riotTag,
        mainLane: formData.mainLane || undefined,
        subLane: formData.subLane || undefined,
      });
    } catch (err: any) {
      setError(err.message || "회원가입에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-5">
        <ErrorAlert message={error} />

        {/* All Fields */}
        <FormFields
          formData={formData}
          loading={loading}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center"
        >
          {loading ? (
            <>
              <LoadingSpinner className="mr-2" />
              가입 중...
            </>
          ) : (
            "회원가입"
          )}
        </button>
      </form>

      <FormDivider text="이미 계정이 있으신가요?" />

      <Link href="/login" className="btn-secondary w-full text-center block">
        로그인
      </Link>
    </div>
  );
}

interface FormFieldsProps {
  formData: any;
  loading: boolean;
  onChange: (field: string, value: string) => void;
}

function FormFields({ formData, loading, onChange }: FormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-[var(--text-primary)] mb-2"
          >
            사용자명
          </label>
          <input
            id="username"
            type="text"
            required
            value={formData.username}
            onChange={(e) => onChange("username", e.target.value)}
            className="input w-full"
            placeholder="username123"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[var(--text-primary)] mb-2"
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="input w-full"
            placeholder="your@email.com"
            disabled={loading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[var(--text-primary)] mb-2"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => onChange("password", e.target.value)}
            className="input w-full"
            placeholder="••••••••"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-[var(--text-primary)] mb-2"
          >
            비밀번호 확인
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => onChange("confirmPassword", e.target.value)}
            className="input w-full"
            placeholder="••••••••"
            disabled={loading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[var(--text-primary)] mb-2"
          >
            이름
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="input w-full"
            placeholder="홍길동"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="riotAccount"
            className="block text-sm font-medium text-[var(--text-primary)] mb-2"
          >
            라이엇 계정
          </label>
          <input
            id="riotAccount"
            type="text"
            value={formData.riotAccount}
            onChange={(e) => onChange("riotAccount", e.target.value)}
            className="input w-full"
            placeholder="HideOnBush#KR1"
            disabled={loading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomSelect
          id="mainLane"
          label="메인 포지션"
          value={formData.mainLane}
          onChange={(value) => onChange("mainLane", value)}
          options={[
            { value: '', label: '선택하지 않음' },
            ...LANES.map(lane => ({ value: lane, label: lane }))
          ]}
          placeholder="선택하지 않음"
          disabled={loading}
        />

        <CustomSelect
          id="subLane"
          label="서브 포지션"
          value={formData.subLane}
          onChange={(value) => onChange("subLane", value)}
          options={[
            { value: '', label: '선택하지 않음' },
            ...LANES.filter(lane => lane !== formData.mainLane).map(lane => ({ value: lane, label: lane }))
          ]}
          placeholder="선택하지 않음"
          disabled={loading}
        />
      </div>
    </div>
  );
}
