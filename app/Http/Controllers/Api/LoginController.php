<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GiangVienResource;
use App\Http\Resources\QuyenResource;
use App\Models\GiangVien;
use App\Service\GiangVienService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request['MatKhau']= md5($request['MatKhau']);
        $data = $request->all();
        $user = new GiangVien();
        $user->fill($data);
        $user->save();
    }
    public function login(Request $request)
    {
        $passwork= md5($request['MatKhau']);
        $mgv=$request['MaGiangVien'];
        $giangVien = new GiangVienService();
        $gv= $giangVien->check($passwork, $mgv);
        if (Empty(json_decode($gv))) {
            return response()->json([
                'status' =>HttpResponse::HTTP_UNAUTHORIZED
            ]);
        }
        $user =GiangVienResource::collection($gv);
        return response()->json([
            'giangVien'=>$user,
            'status' =>HttpResponse::HTTP_OK
        ]);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}